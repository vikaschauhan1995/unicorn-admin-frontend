import { IS_PRODUCT_FORM_VISIBLE, SET_PRODUCT_FORM_VISIBILITY_ACTION, PRODUCT_FORM_DATA, PRODUCT_NAME, PRODUCT_SKU, SET_PRODUCT_FORM_DATA_ACTION, IS_SAVING_FORM_DATA, SET_IS_SAVING_FORM_DATA, SET_SAVE_PRODUCT_DATA_ERROR, SAVE_PRODUCT_DATA_ERROR, SET_PRODUCT_LIST, PRODUCT_LIST, ADD_PRODUCT_IN_PRODUCT_LIST, PRODUCT_LIST_ERROR, SET_PRODUCT_LIST_ERROR, SET_IS_PRODUCT_LIST_LOADING, IS_PRODUCT_LIST_LOADING, MAKE_PRODUCT_FORM_DATA_EMPTY } from "./constants";


const initialState = {
  [IS_PRODUCT_FORM_VISIBLE]: false,
  [PRODUCT_FORM_DATA]: {
    [PRODUCT_NAME]: 'Samsung Galaxy x3',
    [PRODUCT_SKU]: 'SAMG0003'
  },
  [IS_SAVING_FORM_DATA]: false,
  [SAVE_PRODUCT_DATA_ERROR]: null,
  [PRODUCT_LIST]: [],
  [PRODUCT_LIST_ERROR]: false
};


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_FORM_VISIBILITY_ACTION:
      return { ...state, [IS_PRODUCT_FORM_VISIBLE]: !state[IS_PRODUCT_FORM_VISIBLE] }
    case SET_PRODUCT_FORM_DATA_ACTION:
      const key = action?.payload?.key;
      const value = action?.payload?.value;
      return {
        ...state, [PRODUCT_FORM_DATA]: {
          ...state?.[PRODUCT_FORM_DATA],
          [key]: value
        }
      };
    case MAKE_PRODUCT_FORM_DATA_EMPTY:
      return {
        ...state, [PRODUCT_FORM_DATA]: {
          [PRODUCT_NAME]: '',
          [PRODUCT_SKU]: ''
        },
      }
    case SET_IS_SAVING_FORM_DATA:
      return { ...state, [IS_SAVING_FORM_DATA]: action.payload };
    case SET_SAVE_PRODUCT_DATA_ERROR:
      return { ...state, [SAVE_PRODUCT_DATA_ERROR]: action.payload };
    case SET_IS_PRODUCT_LIST_LOADING:
      return { ...state, [IS_PRODUCT_LIST_LOADING]: action.payload };
    case SET_PRODUCT_LIST_ERROR:
      return { ...state, [PRODUCT_LIST_ERROR]: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, [PRODUCT_LIST]: action.payload };
    case ADD_PRODUCT_IN_PRODUCT_LIST:
      const list = [...state[PRODUCT_LIST]];
      list.unshift(action.payload);
      return { ...state, [PRODUCT_LIST]: list };
    default:
      return state;
  }
}