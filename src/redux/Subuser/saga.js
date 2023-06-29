import { takeLatest, put, take } from 'redux-saga/effects';
import { ADD_SUB_USER_ACTION, SET_SAVE_SUBUSER_LOADING, SET_SAVE_SUBUSER_ERROR, GET_ALL_SUB_USERS_ACTION, SET_IS_GET_SUBUSER_LIST_ERROR, SET_SUBUSER_LIST } from './constants';
import { BASE_URL } from '../../constants';


function* addSubUser(params) {
  const subuser = params.payload;
  yield put({ type: SET_SAVE_SUBUSER_LOADING, payload: true });
  try {
    const response = yield fetch(`${BASE_URL}/api/user/subuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subuser)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_SAVE_SUBUSER_ERROR, payload: json.error });
      yield put({ type: SET_SAVE_SUBUSER_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: SET_SAVE_SUBUSER_ERROR, payload: false });
      yield put({ type: SET_SAVE_SUBUSER_LOADING, payload: false });
    }
  } catch (error) {
    yield put({ type: SET_SAVE_SUBUSER_LOADING, payload: false });
    console.log("error: ", error.message);
  }
}

function* getAllSubusersAction(params) {
  const _id = params.payload;
  try {
    const response = yield fetch(`${BASE_URL}/api/user/subusers/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_IS_GET_SUBUSER_LIST_ERROR, payload: json.error });
    }
    if (response.ok) {
      yield put({ type: SET_SUBUSER_LIST, payload: json });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}

export default function* saga() {
  yield takeLatest(ADD_SUB_USER_ACTION, addSubUser);
  yield takeLatest(GET_ALL_SUB_USERS_ACTION, getAllSubusersAction);
}