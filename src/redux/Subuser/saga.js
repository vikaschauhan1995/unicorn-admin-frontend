import { takeLatest, put, take } from 'redux-saga/effects';
import { ADD_SUB_USER_ACTION, SET_SAVE_SUBUSER_LOADING, SET_SAVE_SUBUSER_ERROR, GET_ALL_SUB_USERS_ACTION, SET_IS_GET_SUBUSER_LIST_ERROR, SET_SUBUSER_LIST, DELETE_SUBUSER_ACTION, SET_SUBUSER_DELETE_ERROR, SET_SUBUSER_DELETE_LOADING, REMOVE_SUBUSER_FROM_SUBUSER_LIST } from './constants';
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

function* deleteSubuser(params) {
  try {
    const user_id = params.payload._id;
    yield put({ type: SET_SUBUSER_DELETE_LOADING, payload: user_id });
    const response = yield fetch(`${BASE_URL}/api/user/subuser/${user_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_SUBUSER_DELETE_ERROR, payload: json.error });
      yield put({ type: SET_SUBUSER_DELETE_LOADING, payload: false });
    }
    if (response.ok) {
      yield put({ type: REMOVE_SUBUSER_FROM_SUBUSER_LIST, payload: json });
      yield put({ type: SET_SUBUSER_DELETE_ERROR, payload: null });
      yield put({ type: SET_SUBUSER_DELETE_LOADING, payload: false });
    }
    // console.log('user_id', user_id);
  } catch (error) {
    console.log("error: ", error.message);
  }
}

export default function* saga() {
  yield takeLatest(ADD_SUB_USER_ACTION, addSubUser);
  yield takeLatest(GET_ALL_SUB_USERS_ACTION, getAllSubusersAction);
  yield takeLatest(DELETE_SUBUSER_ACTION, deleteSubuser)
}