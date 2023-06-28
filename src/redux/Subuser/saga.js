import { takeLatest, put, take } from 'redux-saga/effects';
import { ADD_SUB_USER_ACTION, SET_SAVE_SUBUSER_LOADING, SET_SAVE_SUBUSER_ERROR } from './constants';
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

export default function* saga() {
  yield takeLatest(ADD_SUB_USER_ACTION, addSubUser);
}