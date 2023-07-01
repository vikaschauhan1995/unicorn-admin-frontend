import { SAVE_PRODUCT_DATA_ACTION, SET_PRODUCT_FORM_DATA_ACTION, SET_PRODUCT_FORM_VISIBILITY_ACTION } from "./constants";



export function setProductFormVisibilityAction() {
  return {
    type: SET_PRODUCT_FORM_VISIBILITY_ACTION
  }
}

export function setProductFormDataAction(key, value) {
  return {
    type: SET_PRODUCT_FORM_DATA_ACTION,
    payload: { key, value }
  }
}

export function saveProductData(productData) {
  return {
    type: SAVE_PRODUCT_DATA_ACTION,
    payload: productData
  }
}