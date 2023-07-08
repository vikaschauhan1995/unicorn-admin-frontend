import { IS_PRODUCT_FORM_VISIBLE, SET_PRODUCT_FORM_VISIBILITY_ACTION, PRODUCT_FORM_DATA, PRODUCT_NAME, PRODUCT_SKU, SET_PRODUCT_FORM_DATA_ACTION, IS_SAVING_FORM_DATA, SET_IS_SAVING_FORM_DATA, SET_SAVE_PRODUCT_DATA_ERROR, SAVE_PRODUCT_DATA_ERROR, SET_PRODUCT_LIST, PRODUCT_LIST, ADD_PRODUCT_IN_PRODUCT_LIST, PRODUCT_LIST_ERROR, SET_PRODUCT_LIST_ERROR, SET_IS_PRODUCT_LIST_LOADING, IS_PRODUCT_LIST_LOADING, MAKE_PRODUCT_FORM_DATA_EMPTY, PRODUCT_ID, SET_PRODUCT_IN_PRODUCT_FORM_ACTION, REMOVE_PRODUCT_FORM_ERROR_ACTION, SET_IS_UPDATE_PRODUCT_LOADING, IS_UPDATE_PRODUCT_LOADING, UPDATE_A_PRODUCT_FROM_PRODUCT_LIST, SET_UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_ERROR, SET_SELECTED_PRODUCT_FOR_DELETING_ACTION, SELECTED_PRODUCT_FOR_DELETING, REMOVE_SELECTED_PRODUCT_FOR_DELETING_ACTION, SET_PRODUCT_DELETING, IS_PRODUCT_DELETING, REMOVE_DELETED_PRODUCT_FROM_PRODUCT_LIST, PRODUCT_QUANTITY, PRODUCT_PRICE } from "./constants";


const initialState = {
  [IS_PRODUCT_FORM_VISIBLE]: false,
  [PRODUCT_FORM_DATA]: {
    [PRODUCT_ID]: null,
    [PRODUCT_NAME]: 'Samsung Galaxy S17',
    [PRODUCT_SKU]: 'SAMG0018',
    [PRODUCT_QUANTITY]: 0,
    [PRODUCT_PRICE]: 0,
  },
  [IS_SAVING_FORM_DATA]: false,
  [SAVE_PRODUCT_DATA_ERROR]: null,
  [PRODUCT_LIST]: [],
  [PRODUCT_LIST_ERROR]: null,
  [UPDATE_PRODUCT_ERROR]: null,
  [IS_PRODUCT_LIST_LOADING]: false,
  [IS_UPDATE_PRODUCT_LOADING]: false,
  [SELECTED_PRODUCT_FOR_DELETING]: null,
  [IS_PRODUCT_DELETING]: false
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
          [PRODUCT_ID]: null,
          [PRODUCT_NAME]: '',
          [PRODUCT_SKU]: '',
          [PRODUCT_QUANTITY]: 0,
          [PRODUCT_PRICE]: 0
        },
      }
    case SET_PRODUCT_IN_PRODUCT_FORM_ACTION:
      return {
        ...state, [PRODUCT_FORM_DATA]: {
          [PRODUCT_ID]: action?.payload?.[PRODUCT_ID],
          [PRODUCT_NAME]: action?.payload?.[PRODUCT_NAME],
          [PRODUCT_SKU]: action?.payload?.[PRODUCT_SKU],
          [PRODUCT_QUANTITY]: action?.payload?.[PRODUCT_QUANTITY],
          [PRODUCT_PRICE]: action?.payload?.[PRODUCT_PRICE]
        }
      }
    case SET_IS_SAVING_FORM_DATA:
      return { ...state, [IS_SAVING_FORM_DATA]: action?.payload };
    case SET_SAVE_PRODUCT_DATA_ERROR:
      return { ...state, [SAVE_PRODUCT_DATA_ERROR]: action?.payload };
    case SET_IS_PRODUCT_LIST_LOADING:
      return { ...state, [IS_PRODUCT_LIST_LOADING]: action?.payload };
    case SET_PRODUCT_LIST_ERROR:
      return { ...state, [PRODUCT_LIST_ERROR]: action?.payload };
    case SET_PRODUCT_LIST:
      return { ...state, [PRODUCT_LIST]: action?.payload };
    case ADD_PRODUCT_IN_PRODUCT_LIST:
      const list = [...state[PRODUCT_LIST]];
      list.unshift(action?.payload);
      return { ...state, [PRODUCT_LIST]: list };
    case REMOVE_PRODUCT_FORM_ERROR_ACTION:
      return { ...state, [SAVE_PRODUCT_DATA_ERROR]: null };
    case SET_IS_UPDATE_PRODUCT_LOADING:
      return { ...state, [IS_UPDATE_PRODUCT_LOADING]: action?.payload };
    case UPDATE_A_PRODUCT_FROM_PRODUCT_LIST:
      const updatedProduct = action?.payload;
      const newList = state?.[PRODUCT_LIST].map((product) => {
        if (product[PRODUCT_ID] === updatedProduct[PRODUCT_ID]) {
          return action?.payload;
        } else {
          return product;
        }
      });
      return { ...state, [PRODUCT_LIST]: newList };
    case SET_UPDATE_PRODUCT_ERROR:
      return { ...state, [UPDATE_PRODUCT_ERROR]: action?.payload };
    case SET_SELECTED_PRODUCT_FOR_DELETING_ACTION:
      return { ...state, [SELECTED_PRODUCT_FOR_DELETING]: action?.payload };
    case REMOVE_SELECTED_PRODUCT_FOR_DELETING_ACTION:
      return { ...state, [SELECTED_PRODUCT_FOR_DELETING]: null };
    case SET_PRODUCT_DELETING:
      return { ...state, [IS_PRODUCT_DELETING]: action?.payload };
    case REMOVE_DELETED_PRODUCT_FROM_PRODUCT_LIST:
      const removedItemList = state[PRODUCT_LIST]?.filter(product => {
        if (product?.[PRODUCT_ID] !== action?.payload?.[PRODUCT_ID]) {
          return product;
        }
      });
      return { ...state, [PRODUCT_LIST]: removedItemList };
    default:
      return state;
  }
}