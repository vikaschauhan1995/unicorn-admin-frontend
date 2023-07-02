import { DELETE_PRODUCT_ACTION, GET_PRODUCT_LIST_ACTION, MAKE_PRODUCT_FORM_DATA_EMPTY, REMOVE_PRODUCT_FORM_ERROR_ACTION, REMOVE_SELECTED_PRODUCT_FOR_DELETING_ACTION, SAVE_PRODUCT_DATA_ACTION, SET_PRODUCT_FORM_DATA_ACTION, SET_PRODUCT_FORM_VISIBILITY_ACTION, SET_PRODUCT_IN_PRODUCT_FORM_ACTION, SET_SELECTED_PRODUCT_FOR_DELETING_ACTION, UPDATE_PRODUCT_ACTION } from "./constants";



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

export function getProductListAction() {
  return {
    type: GET_PRODUCT_LIST_ACTION
  }
}

export function setProductInProductFormAction(product) {
  return {
    type: SET_PRODUCT_IN_PRODUCT_FORM_ACTION,
    payload: product
  }
}

export function makeProductFormDataEmpty() {
  return {
    type: MAKE_PRODUCT_FORM_DATA_EMPTY
  }
}

export function removeFormErrorAction() {
  return { type: REMOVE_PRODUCT_FORM_ERROR_ACTION };
}

export function updateProductAction(product) {
  return {
    type: UPDATE_PRODUCT_ACTION,
    payload: product
  }
}

export function setSelectedProductForDeleting(product) {
  return {
    type: SET_SELECTED_PRODUCT_FOR_DELETING_ACTION,
    payload: product
  }
}

export function removeSelectedProductForDeletingAction() {
  return {
    type: REMOVE_SELECTED_PRODUCT_FOR_DELETING_ACTION
  }
}

export function deleteProductAction(_id) {
  return {
    type: DELETE_PRODUCT_ACTION,
    payload: _id
  }
}