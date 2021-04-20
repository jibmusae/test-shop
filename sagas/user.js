import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../reducers/user';

// API
function loginAPI(data) {
  return axios.post('/api/login', data);
}
function logoutAPI() {
  return axios.post('/api/logout');
}
function signupAPI(data) {
  return axios.post('/api/signup', data);
}

// 로그인
function* login(action) {
  try {
    // 서버 필요
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function* logout(action) {
  try {
    // 서버 필요
    // const result = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: LOGOUT_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원가입
function* signup(action) {
  try {
    // 서버 필요
    // const result = yield call(signupAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGNUP_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}