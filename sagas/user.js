import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUECCSS,
  LOAD_MY_INFO_FAILURE,
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

// 로그인 정보 불러오기
function loadMyInfoAPI() {
  return axios.get('/user');
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUECCSS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그인
function loginAPI(data) {
  return axios.post('/user/login', data);
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function logoutAPI() {
  return axios.post('/user/logout');
}
function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 회원가입
function signupAPI(data) {
  return axios.post('/user/signup', data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 추가
function addCartAPI(data) {
  return axios.post('/cart', data);
}
function* addCart(action) {
  try {
    const result = yield call(addCartAPI, action.data);
    yield put({
      type: ADD_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_CART_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 수정
function updateCartAPI(data) {
  return axios.patch(`/cart/${data.cartId}`, data);
}
function* updateCart(action) {
  try {
    const result = yield call(updateCartAPI, action.data);
    yield put({
      type: UPDATE_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_CART_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 삭제
function removeCartAPI(data) {
  return axios.delete(`/cart/${data.cartId}`, data);
}
function* removeCart(action) {
  try {
    const result = yield call(removeCartAPI, action.data);
    yield put({
      type: REMOVE_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_CART_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
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
    fork(watchLoadMyInfo),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchAddCart),
    fork(watchUpdateCart),
    fork(watchRemoveCart),
  ]);
}
