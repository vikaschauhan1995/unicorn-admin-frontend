import { IS_SAVE_SUBUSER_LOADING, SET_SAVE_SUBUSER_LOADING, SET_SAVE_SUBUSER_ERROR, IS_SAVE_SUBUSER_ERROR } from "./constants";


const initialState = {
  [IS_SAVE_SUBUSER_LOADING]: null,
  [IS_SAVE_SUBUSER_ERROR]: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVE_SUBUSER_LOADING:
      return { ...state, [IS_SAVE_SUBUSER_LOADING]: action.payload };
    case SET_SAVE_SUBUSER_ERROR:
      return { ...state, [IS_SAVE_SUBUSER_ERROR]: action.payload };
    default:
      return state;
  }
}