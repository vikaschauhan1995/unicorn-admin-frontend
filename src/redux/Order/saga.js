import { takeLatest, put, take } from 'redux-saga/effects';
import { SAVE_ORDER_ACTION, SET_IS_SAVE_ORDER_LOADING } from './constants';
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
    const json = response.json();
    if (!response.ok) {
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: SET_IS_SAVE_ORDER_LOADING, payload: false });
    }
    // console.log("params", params);
  } catch (error) {
    console.log("error: ", error);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_ORDER_ACTION, saveOrder);
}