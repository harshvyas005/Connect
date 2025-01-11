import {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
} from "./ActionType";

// Initial state for payment
const initialState = {
  orderId: null, // Store the orderId when the payment is successful
  error: null, // Store any errors if the payment fails
  loading: false, // Indicate whether a payment request is in progress
};

// Reducer function
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true when a payment request is initiated
        error: null, // Clear any existing error
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        orderId: action.payload, // Save the orderId in the state
        loading: false, // Stop loading when payment is successful
        error: null, // Clear any existing error
      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        loading: false, // Stop loading when payment fails
        error: action.payload, // Store error message
      };
    default:
      return state;
  }
};

export default paymentReducer;
