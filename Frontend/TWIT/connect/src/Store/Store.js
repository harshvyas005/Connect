import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { tweetReducer } from "./Twit/Reducer";

import logger from "redux-logger";
import { themeReducer } from "./Theme/Reducer";
import paymentReducer from "./Payment/Reducer";


// Combine all reducers
const rootReducers = combineReducers({
  auth: authReducer,
  twit: tweetReducer,
  theme:themeReducer,
  payment:paymentReducer,

});

export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk, logger) 
);
