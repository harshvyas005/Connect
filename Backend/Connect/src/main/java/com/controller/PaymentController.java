package com.controller;

import java.time.LocalDateTime;

//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.Entity.User;
import com.Exception.UserException;
import com.response.PaymentLinkResponse;



@RestController
@RequestMapping("/api/plan")
public class PaymentController {

 

    @Autowired
    private com.service.CashFreeService cashFreeService;

    @Autowired
    private com.service.UserService userService;

    @Autowired
    private com.Repository.UserRepository userRepository;

    @PostMapping("/subscribe/{planType}")
    public ResponseEntity<PaymentLinkResponse> createSubscription(
            @PathVariable String planType,
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);

        String orderId = "order_" + user.getId() + "_" + System.currentTimeMillis();
        double amount;

        // Set plan-specific details
        if (planType.equalsIgnoreCase("monthly")) {
            amount = 650.0;
        } else if (planType.equalsIgnoreCase("yearly")) {
            amount = 6800.0;
        } else {
            throw new IllegalArgumentException("Invalid plan type: " + planType);
        }

        try {
            // Generate payment link using Cashfree service
            String paymentLink = cashFreeService.generateOrder(
                    orderId,
                    amount,
                    user.getEmail(),
                    user.getMobile(),
                    String.valueOf(user.getId())); // Pass customer_id

            // Prepare response
            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPaymentLink(paymentLink);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            throw new RuntimeException("Error while creating subscription: " + e.getMessage(), e);
        }
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<String> fetchPaymentStatus(@PathVariable String orderId) {
        try {
            // Fetch payment details from Cashfree (mocking service here)
            String status = cashFreeService.fetchOrderStatus(orderId);

            if ("PAID".equalsIgnoreCase(status)) {
                // Update user verification and subscription details
            	User user = userRepository.findById(Long.parseLong(orderId.split("_")[1]))
                        .orElseThrow(() -> new UserException("User not found"));


                String planType = status.equalsIgnoreCase("yearly") ? "yearly" : "monthly";

                user.getVerification().setStartedAt(LocalDateTime.now());
                if ("yearly".equals(planType)) {
                    user.getVerification().setEndAt(user.getVerification().getStartedAt().plusYears(1));
                } else {
                    user.getVerification().setEndAt(user.getVerification().getStartedAt().plusMonths(1));
                }

                userRepository.save(user);
            }

            return new ResponseEntity<>("Payment status: " + status, HttpStatus.OK);

        } catch (Exception e) {
            throw new RuntimeException("Error while fetching payment status: " + e.getMessage(), e);
        }
    }
}
