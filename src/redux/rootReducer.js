import { combineReducers } from "redux";
import { AUTH_REDUCER } from "./Auth/constants";
import { reducer as authReducer } from "./Auth/reducer";
import { SUBUSER_REDUCER } from "./Subuser/constants";
import { reducer as subuserReducer } from "./Subuser/reducer";
import { PERMISSION_REDUCER } from './Permission/constants';
import { reducer as permissionReducer } from './Permission/reducer';

export default combineReducers({
  [AUTH_REDUCER]: authReducer,
  [SUBUSER_REDUCER]: subuserReducer,
  [PERMISSION_REDUCER]: permissionReducer
});