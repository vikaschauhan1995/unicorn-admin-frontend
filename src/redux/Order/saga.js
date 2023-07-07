import { takeLatest, put, take } from 'redux-saga/effects';
import {
  GET_ORDER_LIST, SAVE_ORDER_ACTION, SET_IS_SAVE_ORDER_LOADING, SET_IS_GET_ORDER_LOADING, SET_ORDER_LIST, UPDATE_ORDER_ACTION, ADD_ORDER_TO_PRODUCT_LIST_ACTION, UPDATE_AN_ORDER_FROM_ORDER_LIST_ACTION, TOGGLE_ORDER_FORM_VISIBLE, MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION, MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION, SET_IS_DELETE_ORDER_LOADING,
  IS_DELETE_ORDER_LOADING,
  DELETE_ORDER_ACTION,
  REMOVE_AN_ORDER_FROM_ORDER_LIST,
  REMOVE_SELECTED_ORDER_FOR_DELETING_ACTION,
} from './constants';
import { BASE_URL } from '../../constants';


function* saveOrder(params) {
  try {
    yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: true });
    const order = params?.payload;
    const response = yield fetch(`${BASE_URL}/api/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: ADD_ORDER_TO_PRODUCT_LIST_ACTION, payload: json });
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    yield put({ type: TOGGLE_ORDER_FORM_VISIBLE });
    yield put({ type: MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION });
    yield put({ type: MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION });
    // console.log("response", json);
  } catch (error) {
    console.log("error: ", error.message);
  }
}
function* getOrderList() {
  try {
    const response = yield fetch(`${BASE_URL}/api/order`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_IS_GET_ORDER_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: SET_ORDER_LIST, payload: json });
      yield put({ type: SET_IS_GET_ORDER_LOADING, payload: false });
    }
    // console.log("json=>", json);
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function* updateOrder(params) {
  try {
    yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: true });
    const order = params?.payload;
    const response = yield fetch(`${BASE_URL}/api/order`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: UPDATE_AN_ORDER_FROM_ORDER_LIST_ACTION, payload: json });
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    yield put({ type: TOGGLE_ORDER_FORM_VISIBLE });
    yield put({ type: MAKE_BACK_TO_INITIAL_STATE_OF_FORM_DATA_ACTION });
    yield put({ type: MAKE_BACK_TO_INTIAL_STATE_OF_FORM_DATA_ERROR_ACTION });
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function* deleteOrder(params) {
  try {
    const _id = params?.payload;
    yield put({ type: SET_IS_DELETE_ORDER_LOADING, payload: true });
    const response = yield fetch(`${BASE_URL}/api/order/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = yield response.json();
    if (!response.ok) {

    }
    if (response.ok) {
      yield put({ type: REMOVE_AN_ORDER_FROM_ORDER_LIST, payload: json });
    }
    yield put({ type: SET_IS_DELETE_ORDER_LOADING, payload: false });
    yield put({ type: REMOVE_SELECTED_ORDER_FOR_DELETING_ACTION });
  } catch (error) {
    console.log("error: ", error.message);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_ORDER_ACTION, saveOrder);
  yield takeLatest(GET_ORDER_LIST, getOrderList);
  yield takeLatest(UPDATE_ORDER_ACTION, updateOrder);
  yield takeLatest(DELETE_ORDER_ACTION, deleteOrder);
}