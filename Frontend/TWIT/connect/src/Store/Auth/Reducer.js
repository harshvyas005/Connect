// import { updateUserProfile } from "./Action";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  FIND_USER_BY_ID_REQUEST,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_FAILURE,
  SEARCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FIND_USER_BY_ID_FAILURE,
} from "./ActionType";

const initialState = {
  findUser:null,
  following:false,
  user: null,
  loading: false,
  error: null,
  jwt: null,
  updateUser: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case FIND_USER_BY_ID_REQUEST:
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_USER_REQUEST:
      return { ...state, searchResult: [], loading: true, error: null };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null, updateUser: false };

    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        updateUser: true,
      };

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, jwt: action.payload, error: null };

    case FIND_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        findUser: action.payload,
        error: null,
      };
      
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: action.payload,
        error: null,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        findUser: action.payload,
        error: null,
      };

    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case UPDATE_USER_FAILURE:
    case FIND_USER_BY_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
