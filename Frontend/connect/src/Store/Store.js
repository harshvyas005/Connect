import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { tweetReducer } from "./Twit/Reducer";
// Uncomment logger for debugging Redux actions
import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";


// Combine all reducers
const rootReducers = combineReducers({
  auth: authReducer,
  twit: tweetReducer,
});

// Use legacy_createStore with middleware
export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk, logger) // Add logger for enhanced debugging
);
