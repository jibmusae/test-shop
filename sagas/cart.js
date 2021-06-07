import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_MY_CART_REQUEST,
  LOAD_MY_CART_SUCCESS,
  LOAD_MY_CART_FAILURE,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
  ALL_CHECK_REQUEST,
  ALL_CHECK_SUCCESS,
  ALL_CHECK_FAILURE,
} from '../reducers/cart';

// 내 장바구니 불러오기
function loadMyCartAPI() {
  return axios.get('/cart');
}
function* loadMyCart(action) {
  try {
    const result = yield call(loadMyCartAPI, action.data);
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
  return axios.delete(`/cart/${data}`);
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

// 전체 체크
function allCheckAPI(data) {
  return axios.patch(`/cart/allCheck`, data);
}
function* allCheck(action) {
  try {
    const result = yield call(allCheckAPI, action.data);
    yield put({
      type: ALL_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ALL_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyCart() {
  yield takeLatest(LOAD_MY_CART_REQUEST, loadMyCart);
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
function* watchAllCheck() {
  yield takeLatest(ALL_CHECK_REQUEST, allCheck);
}

export default function* cartSaga() {
  yield all([
    fork(watchLoadMyCart),
    fork(watchAddCart),
    fork(watchUpdateCart),
    fork(watchRemoveCart),
    fork(watchAllCheck),
  ]);
}
