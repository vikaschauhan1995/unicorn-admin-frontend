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
export const ORDER_CREATED_BY_ID = 'created_by_id';
export const ORDER_CREATED_BY_EMAIL = 'created_by_email';
export const ORDER_ORIGIN = 'origin';
export const ORDER_CREATED_AT = 'created_at';
export const ORDER_MODIFIED_LAST = 'modified_last';

export const CUSTOM_ORDER_GENERATE_KEY = 'custom';
const PROGRAM_ORDER_GENERATE_KEY = 'program';

// error keys for form fields
export const FORM_STATE_ERRORS = 'form_state_error';
export const ORDER_NAME_ERROR = 'name_error';
export const ORDER_MOBILE_ERROR = 'mobile_error';
export const ORDER_ADDRESS_ERROR = 'address_error';
export const ORDER_STATE_ERROR = 'state_error';
export const ORDER_PIN_ERROR = 'pin_error';
export const ORDER_PRODUCT_ERRORS = 'product_errors';
export const ORDER_PRODUCT_ERROR = 'product_error';
export const ORDER_PRODUCT_QUANTITY_ERROR = 'quantity_error';


export const ORDER_FORM_DATA = 'order_form_data';

export const SET_ORDER_LIST = 'set_order_list';
export const ORDER_LIST = 'order_list';

// actions
export const ADD_ORDER_PRODCUT_VIRTUAL_FIELD_ACTION = 'add_order_product_virtual_field_action';
export const REMOVE_ORDER_PRODUCT_VIRTUAL_FIELD_ACTION = 'remove_order_product_virtual_field_action';
export const UPDATE_PRODUCT_FROM_PRODUCT_LIST_ACTION = 'update_product_from_product_list_action';
export const UPDATE_QUANTITY_FROM_FORM_PRODUCT_LIST_ACTION = 'update_quantity_from_form_product_list_action';
export const REMOVE_PRODUCT_FROM_ORDER_FORM_PRODUCT_LIST_ACTION = 'remove_order_product_from_order_form_product';
export const SET_ORDER_FORM_DATA_ACTION = 'set_order_form_data_action';
export const SET_ERROR_ON_FIELD_BY_KEY_VALUE_ACTION = 'set_error_on_field_by_key_value_action';
export const ADD_ERROR_DATA_FOR_PRODUCT_VIRTUAL_FIELD_ACTION = 'add_error_data_for_product_virtual_field_action';
export const REMOVE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION = 'remove_error_data_used_for_product_virtual_field_by_index_action';
export const UPDATE_ERROR_DATA_USED_FOR_PRODUCT_VIRTUAL_FIELD_BY_INDEX_ACTION = 'update_error_data_used_for_product_virtual_field_by_index_action';
export const SAVE_ORDER_ACTION = 'save_order_action';
export const UPDATE_ORDER_ACTION = 'update_order_action';
export const SET_COMPLETE_ORDER_TO_FORM_ACTION = 'set_complete_order_to_form_action';
export const MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION = 'make_back_to_initial_state_of_form_action';
export const MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION = 'make_back_to_initial_state_of_form_data_error_action';
export const ADD_ORDER_TO_PRODUCT_LIST_ACTION = 'add_order_to_product_list_action';
export const UPDATE_AN_ORDER_FROM_ORDER_LIST_ACTION = 'update_an_order_from_order_list_action';
export const SET_SELECTED_ORDER_FOR_DELETING = 'set_selected_order_for_deleting';
export const SELECTED_ORDER_FOR_DELETING = 'selected_order_for_deleting';
export const REMOVE_SELECTED_ORDER_FOR_DELETING_ACTION = 'remove_selected_order_for_deleting_action';
export const DELETE_ORDER_ACTION = 'delete_order_action';
export const REMOVE_AN_ORDER_FROM_ORDER_LIST = 'remove_an_order_from_order_list';

export const GET_ORDER_LIST = 'get_order_list';
export const GET_ORDER = 'get_order';

// actions for loading
export const SET_IS_SAVE_ORDER_LOADING = 'set_save_order_loading';
export const IS_SAVE_ORDER_LOADING = 'is_save_order_loading';

export const SET_IS_GET_ORDER_LOADING = 'set_save_order_loading';
export const IS_GET_ORDER_LOADING = 'is_get_order_loading';

export const SET_IS_DELETE_ORDER_LOADING = 'set_delete_order_loading';
export const IS_DELETE_ORDER_LOADING = 'is_delete_order_loading';
