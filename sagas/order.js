import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
} from '../reducers/order';

// API
function addOrderAPI(data) {
  return axios.post('/api/addOrder', data);
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

// 리퀘스트
function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
}

export default function* userSaga() {
  yield all([fork(watchAddOrder)]);
}
