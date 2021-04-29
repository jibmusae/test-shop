import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  REMOVE_ORDER_REQUEST,
  REMOVE_ORDER_SUCCESS,
  REMOVE_ORDER_FAILURE,
} from '../reducers/order';

// API
function addOrderAPI(data) {
  return axios.post('/api/addOrder', data);
}
function removeOrderAPI(data) {
  return axios.post('/api/removeOrder', data);
}

// 주문내역 추가
function* addOrder(action) {
  try {
    // 서버 필요
    // const result = yield call(addOrderAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_ORDER_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

// 주문내역 삭제
function* removeOrder(action) {
  try {
    // 서버 필요
    // const result = yield call(removeOrderAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_ORDER_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
}
function* watchRemoveOrder() {
  yield takeLatest(REMOVE_ORDER_REQUEST, removeOrder);
}

export default function* userSaga() {
  yield all([fork(watchAddOrder), fork(watchRemoveOrder)]);
}
