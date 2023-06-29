import {
  IS_SAVE_SUBUSER_LOADING,
  SET_SAVE_SUBUSER_LOADING,
  SET_SAVE_SUBUSER_ERROR,
  IS_SAVE_SUBUSER_ERROR,
  IS_GET_SUBUSER_LIST_ERROR,
  SET_IS_GET_SUBUSER_LIST_ERROR,
  SET_SUBUSER_LIST,
  SUBUSER_LIST
} from "./constants";


const initialState = {
  [IS_SAVE_SUBUSER_LOADING]: null,
  [IS_SAVE_SUBUSER_ERROR]: null,
  [IS_GET_SUBUSER_LIST_ERROR]: null,
  [SUBUSER_LIST]: []
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
    default:
      return state;
  }
}