import { USER } from "../Auth/constants";
import {
  IS_SAVE_SUBUSER_LOADING,
  SET_SAVE_SUBUSER_LOADING,
  SET_SAVE_SUBUSER_ERROR,
  IS_SAVE_SUBUSER_ERROR,
  IS_GET_SUBUSER_LIST_ERROR,
  SET_IS_GET_SUBUSER_LIST_ERROR,
  SET_SUBUSER_LIST,
  SUBUSER_LIST,
  SET_SUBUSER_DELETE_ERROR,
  SUBUSER_DELETE_ERROR,
  SET_SUBUSER_DELETE_LOADING,
  SUBUSER_DELETE_LOADING,
  REMOVE_SUBUSER_FROM_SUBUSER_LIST
} from "./constants";


const initialState = {
  [IS_SAVE_SUBUSER_LOADING]: null,
  [IS_SAVE_SUBUSER_ERROR]: null,
  [IS_GET_SUBUSER_LIST_ERROR]: null,
  [SUBUSER_LIST]: [],
  [SUBUSER_DELETE_ERROR]: null,
  [SUBUSER_DELETE_LOADING]: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVE_SUBUSER_LOADING:
      return { ...state, [IS_SAVE_SUBUSER_LOADING]: action.payload };
    case SET_SAVE_SUBUSER_ERROR:
      return { ...state, [IS_SAVE_SUBUSER_ERROR]: action.payload };
    case SET_IS_GET_SUBUSER_LIST_ERROR:
      return { ...state, [IS_GET_SUBUSER_LIST_ERROR]: action.payload };
    case SET_SUBUSER_LIST:
      return { ...state, [SUBUSER_LIST]: action.payload };
    case SET_SUBUSER_DELETE_ERROR:
      return { ...state, [SUBUSER_DELETE_ERROR]: action.payload };
    case SET_SUBUSER_DELETE_LOADING:
      return { ...state, [SUBUSER_DELETE_LOADING]: action.payload };
    case REMOVE_SUBUSER_FROM_SUBUSER_LIST:
      const newSubuserList = state?.[SUBUSER_LIST].filter((subuser) => {
        if (subuser?._id !== action?.payload?.[USER]?._id) {
          return subuser;
        }
      });
      return { ...state, [SUBUSER_LIST]: newSubuserList };
    default:
      return state;
  }
}