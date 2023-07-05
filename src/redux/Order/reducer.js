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
  UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION
} from "./constants";


const initialState = {
  [IS_ORDER_FORM_VISIBLE]: true,
  [ORDER_FORM_DATA]: {
    [ORDER_NAME]: '',
    [ORDER_MOBILE]: null,
    [ORDER_ADDRESS]: '',
    [ORDER_STATE]: '',
    [ORDER_PIN]: null,
    [ORDER_PRODUCTS]: [
      {
        // [ORDER_PRODUCT_ID]: "64a2f3a84cd697d71882bd26",
        // "name": "Samsung Galaxy S20",
        // "sku": "SAMG0020",
        // "images": [],
        [PRODUCT_QUANTITY]: 1
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
      console.log("newProductList", oldProductList_addEmptyField);
      oldProductList_addEmptyField.push({ [PRODUCT_QUANTITY]: 1 });
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
      const updatedProduct = { ...newProduct, [PRODUCT_QUANTITY]: oldProductList?.[index]?.[PRODUCT_QUANTITY] ? oldProductList?.[index]?.[PRODUCT_QUANTITY] : 1 };
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
    default:
      return state;
  }
}