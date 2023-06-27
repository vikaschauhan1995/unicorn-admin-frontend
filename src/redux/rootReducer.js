import { combineReducers } from "redux";
import { AUTH_REDUCER } from "./Auth/constants";
import { reducer as authReducer } from "./Auth/reducer";

export default combineReducers({
  [AUTH_REDUCER]: authReducer
});