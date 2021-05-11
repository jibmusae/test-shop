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
  ITEM_CHECK_REQUEST,
  ITEM_CHECK_SUCCESS,
  ITEM_CHECK_FAILURE,
  ALL_CHECK_REQUEST,
  ALL_CHECK_SUCCESS,
  ALL_CHECK_FAILURE,
} from '../reducers/user';

// API
function addCartAPI(data) {
  return axios.post('/api/addCart', data);
}
function updateCartAPI(data) {
  return axios.post('/api/updateCart', data);
}
function removeCartAPI(data) {
  return axios.post('/api/removeCart', data);
}
function itemCheckAPI(data) {
  return axios.post('/api/itemCheck', data);
}
function allCheckAPI(data) {
  return axios.post('/api/allCheck', data);
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

// 장바구니 상품 체크
function* itemCheck(action) {
  try {
    // 서버 필요
    // const result = yield call(itemCheckAPI, action.data);
    // yield delay(1000);
    yield put({
      type: ITEM_CHECK_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ITEM_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

// 장바구니 전체 체크
function* allCheck(action) {
  try {
    // 서버 필요
    // const result = yield call(allCheckAPI, action.data);
    // yield delay(1000);
    yield put({
      type: ALL_CHECK_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ALL_CHECK_FAILURE,
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
function* watchItemCheck() {
  yield takeLatest(ITEM_CHECK_REQUEST, itemCheck);
}
function* watchAllCheck() {
  yield takeLatest(ALL_CHECK_REQUEST, allCheck);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchAddCart),
    fork(watchUpdateCart),
    fork(watchRemoveCart),
    fork(watchItemCheck),
    fork(watchAllCheck),
  ]);
}
