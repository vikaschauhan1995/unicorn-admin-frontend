import { combineReducers } from "redux";
import { AUTH_REDUCER } from "./Auth/constants";
import { reducer as authReducer } from "./Auth/reducer";
import { SUBUSER_REDUCER } from "./Subuser/constants";
import { reducer as subuserReducer } from "./Subuser/reducer";
import { PERMISSION_REDUCER } from './Permission/constants';
import { reducer as permissionReducer } from './Permission/reducer';
import { PRODUCT_REDUCER } from "./Product/constants";
import { reducer as productReducer } from "./Product/reducer";
import { ORDER_REDUCER } from "./Order/constants";
import { reducer as orderReducer } from './Order/reducer';

export default combineReducers({
  [AUTH_REDUCER]: authReducer,
  [SUBUSER_REDUCER]: subuserReducer,
  [PERMISSION_REDUCER]: permissionReducer,
  [PRODUCT_REDUCER]: productReducer,
  [ORDER_REDUCER]: orderReducer
});