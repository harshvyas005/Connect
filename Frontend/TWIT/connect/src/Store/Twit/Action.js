import { api } from "../../config/api";
import {
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_REQUEST,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_ALL_TWEETS_REQUEST,
  GET_ALL_TWEETS_SUCCESS,
  GET_USERS_TWEETS_FAILURE,
  GET_USERS_TWEETS_REQUEST,
  GET_USERS_TWEETS_SUCCESS,
  LIKE_TWEETS_FAILURE,
  LIKE_TWEETS_REQUEST,
  LIKE_TWEETS_SUCCESS,
  REPLY_TWEET_FAILURE,
  REPLY_TWEET_REQUEST,
  REPLY_TWEET_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  TWEET_CREATE_FAILURE,
  TWEET_CREATE_REQUEST,
  TWEET_CREATE_SUCCESS,
  TWEET_DELETE_FAILURE,
  TWEET_DELETE_REQUEST,
  TWEET_DELETE_SUCCESS,
  USER_LIKE_TWEET_FAILURE,
  USER_LIKE_TWEET_REQUEST,
  USER_LIKE_TWEET_SUCCESS,
} from "./ActionType";

export const createTweetRequest = () => ({
  type: TWEET_CREATE_REQUEST,
});

export const createTweetSuccess = (data) => ({
  type: TWEET_CREATE_SUCCESS,
  payload: data,
});

export const createTweetFailure = (error) => ({
  type: TWEET_CREATE_FAILURE,
  payload: error,
});

// Action for deleting a tweet
export const deleteTweetRequest = () => ({
  type: TWEET_DELETE_REQUEST,
});

export const deleteTweetSuccess = (twitId) => ({
  type: TWEET_DELETE_SUCCESS,
  payload: twitId,
});

export const deleteTweetFailure = (error) => ({
  type: TWEET_DELETE_FAILURE,
  payload: error,
});

// Action for getting all tweets
export const getAllTweetsRequest = () => ({
  type: GET_ALL_TWEETS_REQUEST,
});

export const getAllTweetsSuccess = (twits) => ({
  type: GET_ALL_TWEETS_SUCCESS,
  payload: twits,
});

export const getAllTweetsFailure = (error) => ({
  type: GET_ALL_TWEETS_FAILURE,
  payload: error,
});

export const getAllTweets = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/api/twits/");
      // console.log("get all twits: ", response.data);
      dispatch(getAllTweetsSuccess(response.data));
    } catch (error) {
      // console.log("getalltwits catch error: ", error);
      dispatch(getAllTweetsFailure(error.message));
    }
  };
};
export const getUsersTweets = (userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_TWEETS_REQUEST });
    try {
      const response = await api.get(`/api/twits/user/${userId}`);
      console.log("get USER twits: ", response.data);
      dispatch({ type: GET_USERS_TWEETS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error: ", error.message);
      dispatch({ type: GET_USERS_TWEETS_FAILURE, payload: error.message });
    }
  };
};
export const findTwitsByLikesContainUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: USER_LIKE_TWEET_REQUEST });
    try {
      const response = await api.get(`/api/twits/user/${userId}/likes`);
      console.log("liked tweets ", response.data);
      dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error fetching liked tweets:", error.response || error.message);
      dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: error.message });
    }
  };
};
export const findTweetsById = (twitId) => {
  return async (dispatch) => {
    dispatch({ type: FIND_TWEET_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/twits/${twitId}`);
      console.log("find twit by id: ", response.data);
      dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error: ", error);
      dispatch({
        type: FIND_TWEET_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const createTweet = (twitData) => {
  return async (dispatch) => {
    dispatch(createTweetRequest());
    try {
      const { data } = await api.post(`/api/twits/create`, twitData);
      console.log("created twit: ", data);
      dispatch(createTweetSuccess(data));
    } catch (error) {
      console.log("catch error: ", error);
      dispatch(createTweetFailure(error.message));
    }
  };
};
export const createReply = (twitData) => {
  console.log("dimwit");

  return async (dispatch) => {
    dispatch({ type: REPLY_TWEET_REQUEST });
    try {
      const { data } = await api.post(`/api/twits/reply`, twitData);
      console.log("reply twit: ", data);
      dispatch({ type: REPLY_TWEET_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error: ", error);
      dispatch({
        type: REPLY_TWEET_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const createReTweet = (twitId) => {
  return async (dispatch) => {
    dispatch({ type: RETWEET_REQUEST });
    try {
      const response = await api.put(`/api/twits/${twitId}/retwit`);
      console.log("retwit: ", response.data);
      dispatch({ type: RETWEET_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error: ", error);
      dispatch({
        type: RETWEET_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const likeTweet = (twitId) => {
  return async (dispatch) => {
    dispatch({ type: LIKE_TWEETS_REQUEST });
    try {
      const { data } = await api.post(`/api/${twitId}/likes`, {});
      console.log("like twit: ", data);
      dispatch({ type: LIKE_TWEETS_SUCCESS, payload: data });
    } catch (error) {
      console.log("like tweet catch error: ", error);
      dispatch({
        type: LIKE_TWEETS_FAILURE,
        payload: error.message,
      });
    }
  };
};
export const deleteTweet = (twitId) => {
  return async (dispatch) => {
    dispatch(deleteTweetRequest());
    try {
      await api.delete(`/api/twits/${twitId}`);
      // console.log("delete twit: ", data);
      dispatch(deleteTweetSuccess(twitId));
    } catch (error) {
      console.log("catch error: ", error);
      dispatch(deleteTweetFailure(error.message));
    }
  };
};
