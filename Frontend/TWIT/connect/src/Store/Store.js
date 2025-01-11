import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { tweetReducer } from "./Twit/Reducer";

// Uncomment logger for debugging Redux actions
import logger from "redux-logger";
import { themeReducer } from "./Theme/Reducer";
import paymentReducer from "./Payment/Reducer";
// import { composeWithDevTools } from "redux-devtools-extension";


// Combine all reducers
const rootReducers = combineReducers({
  auth: authReducer,
  twit: tweetReducer,
  theme:themeReducer,
  payment:paymentReducer,

});

// Use legacy_createStore with middleware
export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk, logger) // Add logger for enhanced debugging
);
