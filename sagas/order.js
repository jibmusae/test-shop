import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
} from '../reducers/order';

// 주문내역 추가
function addOrderAPI(data) {
  return axios.post('/api/addOrder', data);
}
function* addOrder(action) {
  try {
    const result = yield call(addOrderAPI, action.data);
    yield put({
      type: ADD_ORDER_SUCCESS,
      data: result.data,
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
