import { api } from "../../config/api";
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from "./ActionType";

export const makePaymentAction = (planType) => async (dispatch) => {
  try {
    // Dispatch PAYMENT_REQUEST before making the API call
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await api.post(`/api/plan/subscribe/${planType}`);

    if (data.paymentLink) {
      // Redirect to the payment link
      window.location.href = data.paymentLink;
    }

    console.log("data", data);
  } catch (error) {
    // Dispatch PAYMENT_FAILURE if an error occurs
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Payment error: ", error);
  }
};

export const verifiedAccountAction = (orderId) => async (dispatch) => {
  try {
    // Dispatch PAYMENT_REQUEST before verifying the account
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await api.get(`/api/plan/${orderId}`);

    console.log("verified account ", data);

    // Dispatch PAYMENT_SUCCESS if verification is successful
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: orderId, // Store the orderId in the state
    });
  } catch (error) {
    // Dispatch PAYMENT_FAILURE if verification fails
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Verification error: ", error);
  }
};
