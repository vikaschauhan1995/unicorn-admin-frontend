import { ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION, REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION, TOGGLE_ORDER_FORM_VISIBLE, UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION, UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION } from "./constants";


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