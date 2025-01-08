package com.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class CashFreeService {
 
    @Value("${cashfree.appId}")
    private String appId;

    @Value("${cashfree.secretKey}")
    private String secretKey;

    @Value("${cashfree.baseUrl}")
    private String baseUrl;
    
    @Value("${cashfree.version:2023-08-01}")
    private String version;


    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public CashFreeService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Generates a payment order in Cashfree.
     *
     * @param orderId        Unique order identifier
     * @param amount         Order amount
     * @param customerEmail  Customer's email
     * @param customerPhone  Customer's phone number
     * @return Payment link to complete the transaction
     */
    public String generateOrder(String orderId, Double amount, String customerEmail, String customerPhone, String customerId) {
        try {
            // Prepare headers
            HttpHeaders headers = createHeaders();

            // Create request body
            Map<String, Object> body = new HashMap<>();
            body.put("order_id", orderId);
            body.put("order_amount", amount);
            body.put("order_currency", "INR");
            body.put("customer_details", Map.of(
                    "customer_id", customerId,
                    "customer_email", customerEmail,
                    "customer_phone", customerPhone
            ));
            System.out.println("Request Payload: " + body);
            System.out.println("Request Headers: " + headers);
            
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            // Call the Cashfree API
            String url = baseUrl + "/orders";
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            if (response == null || response.getBody() == null) {
                throw new RuntimeException("Error: Received null response from Cashfree API");
            }

            
            System.out.println("Response: " + response.getBody());


            // Handle response
            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
                return responseMap.getOrDefault("payment_link", "No payment link found").toString();
            } else {
                throw new RuntimeException("Error: " + response.getStatusCode() + " - " + response.getBody());
            }
        } catch (Exception ex) {
            throw new RuntimeException("Exception while creating order: " + ex.getMessage(), ex);
        }
    }

    /**
     * Fetches the status of an existing order.
     *
     * @param orderId The unique order identifier
     * @return Status of the payment (e.g., "PAID", "PENDING")
     */
    public String fetchOrderStatus(String orderId) {
        try {
            // Prepare headers
            HttpHeaders headers = createHeaders();

            HttpEntity<String> request = new HttpEntity<>(headers);

            // Call the Cashfree API
            String url = baseUrl + "/orders/" + orderId;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

            // Handle response
            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
                return responseMap.getOrDefault("order_status", "UNKNOWN").toString();
            } else {
                throw new RuntimeException("Error: " + response.getStatusCode() + " - " + response.getBody());
            }
        } catch (Exception ex) {
            throw new RuntimeException("Exception while fetching order status: " + ex.getMessage(), ex);
        }
    }

    /**
     * Creates the required HTTP headers for Cashfree API requests.
     *
     * @return HttpHeaders object
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-client-id", appId);
        headers.set("x-client-secret", secretKey);
        headers.set("x-api-version", version);
        System.out.println("Using API Version: " + headers.get("version"));  // Log version
        return headers;
    }
}
