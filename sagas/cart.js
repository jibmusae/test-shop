import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
} from '../reducers/cart';

// API
function addCartAPI(data) {
  return axios.post('/api/addCart', data);
}
function removeCartAPI(data) {
  return axios.post('/api/removeCart', data);
}

// 장바구니 추가
function* addCart(action) {
  try {
    // 서버 필요
    // const result = yield call(addCartAPI, action.data);
    yield delay(1000);
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

// 장바구니 제거
function* removeCart(action) {
  try {
    // 서버 필요
    // const result = yield call(removeCartAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_CART_SUCCESS,
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
function* watchAddCart() {
  yield takeLatest(ADD_CART_REQUEST, addCart);
}
function* watchRemoveCart() {
  yield takeLatest(REMOVE_CART_REQUEST, removeCart);
}

export default function* userSaga() {
  yield all([fork(watchAddCart), fork(watchRemoveCart)]);
}
