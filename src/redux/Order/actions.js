import { ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION, REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION, REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION, TOGGLE_ORDER_FORM_VISIBLE, UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION, UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION, SET_ORDER_FORM_DATA_ACTION, SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION, ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION, REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION, UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION, SAVE_ORDER_ACTION, GET_ORDER_LIST, SET_COMPLETE_ORDER_TO_FORM_ACTION, MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION, MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION, UPDATE_ORDER_ACTION, DELETE_ORDER_ACTION, SET_SELECTED_ORDER_FOR_DELETING, REMOVE_SELECTED_ORDER_FOR_DELETING_ACTION, GET_ORDER } from "./constants";


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

export function getOrderList() {
  return {
    type: GET_ORDER_LIST
  }
}

export function getOrder(order_id) {
  return {
    type: GET_ORDER,
    payload: order_id
  }
}

export function setCompleteOrderToFormAction(order) {
  return {
    type: SET_COMPLETE_ORDER_TO_FORM_ACTION,
    payload: order
  }
}

export function makeBackToInitialStateOfFormDataAction() {
  return {
    type: MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION,
  }
}

export function makeBackToInitialStateOfFormDataErrorAction() {
  return {
    type: MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION
  }
}

export function updateOrderAction(order) {
  return {
    type: UPDATE_ORDER_ACTION,
    payload: order
  }
}

export function setSelectedorderForDeletingAction(order) {
  return {
    type: SET_SELECTED_ORDER_FOR_DELETING,
    payload: order
  }
}

export function removeSelectedOrderForDeletingAction() {
  return {
    type: REMOVE_SELECTED_ORDER_FOR_DELETING_ACTION
  }
}

export function deleteOrderAction(order_id) {
  return {
    type: DELETE_ORDER_ACTION,
    payload: order_id
  }
}