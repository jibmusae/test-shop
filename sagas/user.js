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
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
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
function addCartAPI(data) {
  return axios.post('/api/addCart', data);
}
function updateCartAPI(data) {
  return axios.post('/api/updateCart', data);
}
function removeCartAPI(data) {
  return axios.post('/api/removeCart', data);
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

// 장바구니 추가
function* addCart(action) {
  try {
    // 서버 필요
    // const result = yield call(addCartAPI, action.data);
    // yield delay(1000);
    yield put({
      type: ADD_CART_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_CART_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 수정
function* updateCart(action) {
  try {
    // 서버 필요
    // const result = yield call(updateCartAPI, action.data);
    // yield delay(1000);
    yield put({
      type: UPDATE_CART_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_CART_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 삭제
function* removeCart(action) {
  try {
    // 서버 필요
    // const result = yield call(removeCartAPI, action.data);
    // yield delay(1000);
    yield put({
      type: REMOVE_CART_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_CART_FAILURE,
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
function* watchAddCart() {
  yield takeLatest(ADD_CART_REQUEST, addCart);
}
function* watchUpdateCart() {
  yield takeLatest(UPDATE_CART_REQUEST, updateCart);
}
function* watchRemoveCart() {
  yield takeLatest(REMOVE_CART_REQUEST, removeCart);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchAddCart),
    fork(watchUpdateCart),
    fork(watchRemoveCart),
  ]);
}
