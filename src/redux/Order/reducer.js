import {
  IS_ORDER_FORM_VISIBLE, TOGGLE_ORDER_FORM_VISIBLE, ORDER_FORM_DATA, ORDER_NAME,
  ORDER_MOBILE,
  ORDER_ADDRESS,
  ORDER_STATE,
  ORDER_PIN,
  ORDER_PRODUCTS,
  ORDER_PRODUCT_ID,
  PRODUCT_QUANTITY,
  ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION,
  UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION,
  UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION,
  REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION,
  SET_ORDER_FORM_DATA_ACTION,
  FORM_STATE_ERRORS,
  ORDER_NAME_ERROR,
  ORDER_MOBILE_ERROR,
  ORDER_ADDRESS_ERROR,
  ORDER_STATE_ERROR,
  ORDER_PIN_ERROR,
  SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION,
  ORDER_PRODUCT_ERRORS,
  ORDER_PRODUCT_QUANTITY_ERROR,
  ORDER_PRODUCT_ERROR,
  ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION,
  REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION,
  UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION
} from "./constants";


const initialState = {
  [IS_ORDER_FORM_VISIBLE]: true,
  [ORDER_FORM_DATA]: {
    [ORDER_NAME]: '',
    [ORDER_MOBILE]: 0,
    [ORDER_ADDRESS]: '',
    [ORDER_STATE]: '',
    [ORDER_PIN]: 0,
    [ORDER_PRODUCTS]: [
      {
        // [ORDER_PRODUCT_ID]: "64a2f3a84cd697d71882bd26",
        // "name": "Samsung Galaxy S20",
        // "sku": "SAMG0020",
        // "images": [],
        [PRODUCT_QUANTITY]: 0
      }
    ]
  },
  [FORM_STATE_ERRORS]: {
    [ORDER_NAME_ERROR]: false,
    [ORDER_MOBILE_ERROR]: false,
    [ORDER_ADDRESS_ERROR]: false,
    [ORDER_STATE_ERROR]: false,
    [ORDER_PIN_ERROR]: false,
    [ORDER_PRODUCT_ERRORS]: [
      {
        [ORDER_PRODUCT_ERROR]: false,
        [ORDER_PRODUCT_QUANTITY_ERROR]: false
      }
    ]
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ORDER_FORM_VISIBLE:
      return { ...state, [IS_ORDER_FORM_VISIBLE]: !state?.[IS_ORDER_FORM_VISIBLE] };
    case ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION:
      const oldProductList_addEmptyField = [...state?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]];
      // console.log("newProductList", oldProductList_addEmptyField);
      oldProductList_addEmptyField.push({ [PRODUCT_QUANTITY]: 0 });
      return {
        ...state,
        [ORDER_FORM_DATA]: {
          ...state?.[ORDER_FORM_DATA],
          [ORDER_PRODUCTS]: oldProductList_addEmptyField
        }
      };
    case UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION:
      const newProduct = action?.payload?.selectedProduct;
      const index = action?.payload?.index;
      const oldProductList = [...state?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]];
      const updatedProduct = { ...newProduct, [PRODUCT_QUANTITY]: oldProductList?.[index]?.[PRODUCT_QUANTITY] ? oldProductList?.[index]?.[PRODUCT_QUANTITY] : 0 };
      oldProductList[index] = updatedProduct;
      return {
        ...state,
        [ORDER_FORM_DATA]: {
          ...state?.[ORDER_FORM_DATA],
          [ORDER_PRODUCTS]: oldProductList
        }
      }
    case UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION:
      {
        const oldProductList = [...state?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]];
        const newQuantity = action?.payload?.[PRODUCT_QUANTITY];
        const index = action?.payload?.index;
        oldProductList[index] = { ...oldProductList[index], [PRODUCT_QUANTITY]: newQuantity };
        return {
          ...state,
          [ORDER_FORM_DATA]: {
            ...state?.[ORDER_FORM_DATA],
            [ORDER_PRODUCTS]: oldProductList
          }
        };
      }
    case REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION:
      {
        const oldProductList = [...state?.[ORDER_FORM_DATA]?.[ORDER_PRODUCTS]];
        const index = action?.payload;
        if (oldProductList.length > 1) {
          oldProductList.splice(index, 1);
          return {
            ...state,
            [ORDER_FORM_DATA]: {
              ...state?.[ORDER_FORM_DATA],
              [ORDER_PRODUCTS]: oldProductList
            }
          };
        } else {
          return state;
        }
      }
    case SET_ORDER_FORM_DATA_ACTION:
      {
        const key = action?.payload?.key;
        const value = action?.payload?.value;
        return {
          ...state,
          [ORDER_FORM_DATA]: {
            ...state?.[ORDER_FORM_DATA],
            [key]: value
          }
        }
      }
    case SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION:
      {
        const key = action?.payload?.key;
        const value = action?.payload?.value;
        return {
          ...state,
          [FORM_STATE_ERRORS]: {
            ...state?.[FORM_STATE_ERRORS],
            [key]: value
          }
        }
      }
    case ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION:
      // console.log("state?.[FORM_STATE_ERRORS]=>", state?.[FORM_STATE_ERRORS]);
      {

        return {
          ...state,
          [FORM_STATE_ERRORS]: {
            ...state?.[FORM_STATE_ERRORS],
            [ORDER_PRODUCT_ERRORS]: [
              ...state?.[FORM_STATE_ERRORS]?.[ORDER_PRODUCT_ERRORS],
              {
                [ORDER_PRODUCT_ERROR]: false,
                [ORDER_PRODUCT_QUANTITY_ERROR]: false
              }
            ]
          }
        };
      }
    case REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION:
      {
        const errorList = state?.[FORM_STATE_ERRORS]?.[ORDER_PRODUCT_ERRORS];
        const index = action?.payload;
        if (errorList.length > 1) {
          errorList.splice(index, 1);
          return {
            ...state,
            [FORM_STATE_ERRORS]: {
              ...state?.[FORM_STATE_ERRORS],
              [ORDER_PRODUCT_ERRORS]: errorList
            }
          }
        } else {
          return state;
        }
      }
    case UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION:
      {
        const bool = action?.payload?.bool;
        const index = action?.payload?.index;
        const key = action?.payload?.key;
        const errorList = state?.[FORM_STATE_ERRORS]?.[ORDER_PRODUCT_ERRORS];
        errorList[index] = {
          ...errorList?.[index],
          [key]: bool
        };
        return {
          ...state,
          [FORM_STATE_ERRORS]: {
            ...state[FORM_STATE_ERRORS],
            [ORDER_PRODUCT_ERRORS]: errorList
          }
        };
      }
    default:
      return state;
  }
}