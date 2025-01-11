import { api } from "../../config/api";
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from "./ActionType";

export const makePaymentAction = (planType) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await api.post(`/api/plan/subscribe/${planType}`);

    if (data.paymentLink) {
      window.location.href = data.paymentLink;
    }

    console.log("data", data);
  } catch (error) {
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Payment error: ", error);
  }
};

export const verifiedAccountAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await api.get(`/api/plan/${orderId}`);

    console.log("verified account ", data);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: orderId,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    console.error("Verification error: ", error);
  }
};
