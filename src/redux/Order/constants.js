// reducer
export const ORDER_REDUCER = 'orderReducer';

//
export const TOGGLE_ORDER_FORM_VISIBLE = 'toggle_order_form_visible';
export const IS_ORDER_FORM_VISIBLE = 'isOrderFormVisible';


// form fields
export const ORDER_NAME = 'name';
export const ORDER_MOBILE = 'mobile';
export const ORDER_ADDRESS = 'address';
export const ORDER_STATE = 'state';
export const ORDER_PIN = 'pin';
export const ORDER_PRODUCTS = 'products';
export const ORDER_PRODUCT_ID = '_id';
export const PRODUCT_QUANTITY = 'quantity';
const ORDER_CREATED_BY_ID = 'created_by_id';
const ORDER_CREATED_BY_EMAIL = 'created_by_email';
const ORDER_ORIGIN = 'origin';
const ORDER_CREATED_AT = 'created_at';
const ORDER_MODIFIED_LAST = 'modified_last';

const CUSTOM_ORDER_GENERATE_KEY = 'custom';
const PROGRAM_ORDER_GENERATE_KEY = 'program';


export const ORDER_FORM_DATA = 'order_form_data';


// actions
export const ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION = 'add_order_product_virtual_field_action';
export const REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION = 'remove_order_product_virtual_field_action';
export const UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION = 'update_product_from_product_list_action';
export const UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION = 'update_quantity_from_form_product_list_action';