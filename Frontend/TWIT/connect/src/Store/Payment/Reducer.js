import {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
} from "./ActionType";

const initialState = {
  orderId: null,
  error: null,
  loading: false,
};

// Reducer function
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        orderId: action.payload,
        loading: false,
        error: null,
      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
