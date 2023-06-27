import { takeLatest, put, take } from 'redux-saga/effects';
import {
  LOGIN_ACTION, SET_LOGIN_ERROR, SET_USER, SET_LOGIN_LOADING, USER, LOGOUT_ACTION,
  SET_SIGNUP_LOADING, SIGNUP_ACTION, SET_SIGNUP_ERROR, SET_AUTH_REDUCER_TO_INITIAL_STATE
} from './constants';
import { logoutAction } from './actions';
import { BASE_URL } from '../../constants';


function* sendUserToLogin(params) {
  const user = params.payload;
  try {
    yield put({ type: SET_LOGIN_LOADING, payload: true });
    const response = yield fetch(`${BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_LOGIN_ERROR, payload: json.error });
      yield put({ type: SET_LOGIN_LOADING, payload: false });
    }
    if (response.ok) {
      // save user to localStorage
      const userToJSON = JSON.stringify(json);
      localStorage.setItem([USER], userToJSON);
      // update the auth context
      yield put({ type: SET_USER, payload: json });
      yield put({ type: SET_LOGIN_LOADING, payload: false });
      yield put({ type: SET_LOGIN_ERROR, payload: null });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function* signup(params) {
  const user = params.payload;
  try {
    yield put({ type: SET_SIGNUP_LOADING, payload: true });
    const response = yield fetch(`${BASE_URL}/api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const json = yield response.json();
    if (!response.ok) {
      yield put({ type: SET_SIGNUP_ERROR, payload: json.error });
      yield put({ type: SET_SIGNUP_LOADING, payload: false });
    }
    if (response.ok) {
      // save user to localStorage
      const userToJSON = JSON.stringify(json);
      localStorage.setItem([USER], userToJSON);
      // update the auth context
      yield put({ type: SET_USER, payload: json });
      yield put({ type: SET_SIGNUP_LOADING, payload: false });
      yield put({ type: SET_SIGNUP_ERROR, payload: null });
    }
  } catch (error) {
    console.log("error: ", error.message);
  }
}

function* logout() {
  try {
    localStorage.clear(USER);
    yield put({ type: SET_AUTH_REDUCER_TO_INITIAL_STATE });
  } catch (error) {
    console.log("error: ", error.message);
  }
}


export default function* saga() {
  yield takeLatest(LOGIN_ACTION, sendUserToLogin);
  yield takeLatest(SIGNUP_ACTION, signup);
  yield takeLatest(LOGOUT_ACTION, logout);
}