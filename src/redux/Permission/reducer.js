import { PERMISSION_LIST, SET_ALL_PERMISSIONS, PERMISSION_LIST_ERROR, SET_PERMISSION_LIST_ERROR } from "./constants";


const initialState = {
  [PERMISSION_LIST]: [],
  [PERMISSION_LIST_ERROR]: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PERMISSIONS:
      return { ...state, [PERMISSION_LIST]: action.payload }
    case SET_PERMISSION_LIST_ERROR:
      return { ...state, [PERMISSION_LIST_ERROR]: action.payload }
    default:
      return state;
  }
}