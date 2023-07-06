import { ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION, REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION, REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION, TOGGLE_ORDER_FORM_VISIBLE, UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION, UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION, SET_ORDER_FORM_DATA_ACTION, SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION, ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION, REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION, UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION, SAVE_ORDER_ACTION } from "./constants";


export function toggleOrderFormVisibleAction() {
  return {
    type: TOGGLE_ORDER_FORM_VISIBLE
  }
}

export function addOrderProductVirualFieldAction() {
  return {
    type: ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION
  }
}

export function removeOrderProductVirtualFieldAction(product) {
  return {
    type: REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION,
    payload: product
  }
}

export function updateProductFromProductListAction(obj) {
  return {
    type: UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION,
    payload: obj
  }
}

export function updateQuantityFromFormProductListAction(obj) {
  return {
    type: UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION,
    payload: obj
  }
}

export function removeProductFromOrderFormProductListAction(index) {
  return {
    type: REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION,
    payload: index
  }
}

export function setOrderFormDataAction(key, value) {
  return {
    type: SET_ORDER_FORM_DATA_ACTION,
    payload: { key, value }
  }
}

export function setErrorOnFieldByKeyValueAction(key, value) {
  return {
    type: SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION,
    payload: { key, value }
  }
}

export function addErrorDataForProductVirtualFieldAction() {
  return {
    type: ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION
  }
}

export function removeErrorDataUsedForProductVirtualFieldByIndexAction(index) {
  return {
    type: REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION,
    payload: index
  }
}

export function updateErrorDataUsedForProductVirualFieldByIdIndexAction(bool, index, key) {
  return {
    type: UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION,
    payload: { bool, index, key }
  }
}

export function saveOrderAction(order) {
  return {
    type: SAVE_ORDER_ACTION,
    payload: order
  }
}