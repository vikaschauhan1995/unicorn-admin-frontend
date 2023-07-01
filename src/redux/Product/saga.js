import { takeLatest, put, take } from 'redux-saga/effects';
import { ADD_PRODUCT_IN_PRODUCT_LIST, GET_PRODUCT_LIST_ACTION, IS_PRODUCT_LIST_LOADING, MAKE_PRODUCT_FORM_DATA_EMPTY, SAVE_PRODUCT_DATA_ACTION, SET_IS_SAVING_FORM_DATA, SET_PRODUCT_FORM_VISIBILITY_ACTION, SET_PRODUCT_LIST, SET_PRODUCT_LIST_ERROR, SET_SAVE_PRODUCT_DATA_ERROR } from './constants';
import { BASE_URL } from '../../constants';

function* saveProductDataAction(params) {
  const productData = params.payload;
  try {
    yield put({ type: SET_IS_SAVING_FORM_DATA, payload: true });
    const response = yield fetch(`${BASE_URL}/api/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_SAVE_PRODUCT_DATA_ERROR, payload: json.error });
      yield put({ type: SET_IS_SAVING_FORM_DATA, payload: false });
    }
    if (response.ok) {
      yield put({ type: ADD_PRODUCT_IN_PRODUCT_LIST, payload: json });
      yield put({ type: SET_SAVE_PRODUCT_DATA_ERROR, payload: null });
      yield put({ type: SET_IS_SAVING_FORM_DATA, payload: false });
      yield put({ type: SET_PRODUCT_FORM_VISIBILITY_ACTION });
      yield put({ type: MAKE_PRODUCT_FORM_DATA_EMPTY });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function* getProductList() {
  try {
    yield put({ type: IS_PRODUCT_LIST_LOADING, payload: true });
    const response = yield fetch(`${BASE_URL}/api/product`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_PRODUCT_LIST_ERROR, paylaod: json.error });
      yield put({ type: IS_PRODUCT_LIST_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: SET_PRODUCT_LIST, payload: json });
      yield put({ type: SET_PRODUCT_LIST_ERROR, paylaod: false });
      yield put({ type: IS_PRODUCT_LIST_LOADING, payload: false });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}



export default function* saga() {
  yield takeLatest(SAVE_PRODUCT_DATA_ACTION, saveProductDataAction);
  yield takeLatest(GET_PRODUCT_LIST_ACTION, getProductList);
}