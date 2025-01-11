import { api, API_BASE_URL } from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FIND_USER_BY_ID_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  LOGIN_USER_REQUEST,
  GET_USER_PROFILE_REQUEST,
  GOOGLE_LOGIN_REQUEST,
  FIND_USER_BY_ID_REQUEST,
  UPDATE_USER_REQUEST,
  FOLLOW_USER_REQUEST,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "./ActionType";
import axios from "axios";

export const loginRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const registerRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerSuccess = (userData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userData,
});

export const registerFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});
const getUserProfileSuccess = (user) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user,
});
const getUserProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});

export const loginUser = (loginData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    const user = response.data;
    console.log("logged in User:", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(loginSuccess(user));
  } catch (error) {
    console.log("login error", error);
    dispatch(loginFailure(error.message || "An error occurred during login."));
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    const user = response.data;
    console.log("registered User:", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(registerSuccess(user));
  } catch (error) {
    console.log("error", error);
    dispatch(
      registerFailure(error.message || "An error occurred during registration.")
    );
  }
};
export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch(getUserProfileRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const user = response.data;
    console.log("user profile", user);
    dispatch(getUserProfileSuccess(user));
  } catch (error) {
    console.log("error", error);
    dispatch(
      getUserProfileFailure(error.message || "An error occurred during login.")
    );
  }
};
export const findUserbyId = (userId) => async (dispatch) => {
  dispatch({ type: FIND_USER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/api/users/${userId}`);
    const user = response.data;
    console.log("user by id", user);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: user });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};
export const updateUserProfile = (reqData) => async (dispatch) => {
  console.log("update profile reqData", reqData);
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.put(`/api/users/update`, reqData);
    const user = response.data;
    console.log("updated user", user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: user });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};
export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const response = await api.put(`/api/users/${userId}/follow`);
    const user = response.data;
    console.log("followed user", user);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: user });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};
export const searchUser = (query, userId) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const response = await api.get(
      `/api/users/search/${userId}?query=${query}`
    );
    const users = response.data;
    console.log("search result -: ", users);

    dispatch({ type: SEARCH_USER_SUCCESS, payload: users });
  } catch (error) {
    dispatch({ type: SEARCH_USER_FAILURE, error: error.message });
  }
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};
