import { takeLatest, put, take } from 'redux-saga/effects';
import { GET_ALL_PERMISSIONS_ACTION, SET_PERMISSION_LIST_ERROR, PERMISSION_LIST_ERROR } from './constants';
import request from '../../utils/request';
import { BASE_URL } from '../../constants';

function* getAllPermissions() {
  try {
    const response = yield request('GET', `${BASE_URL}/api/permission/all`);
    const json = yield response.json();
    if (response.error) {
      yield put({ type: PERMISSION_LIST_ERROR, payload: true });
    }
    if (response.ok) {
      yield put({ type: SET_PERMISSION_LIST_ERROR, payload: json });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}

export default function* saga() {
  yield takeLatest(GET_ALL_PERMISSIONS_ACTION, getAllPermissions)
}