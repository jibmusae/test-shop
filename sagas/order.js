import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  INITIALIZE_SEQUENCE_REQUEST,
  INITIALIZE_SEQUENCE_SUCCESS,
  INITIALIZE_SEQUENCE_FAILURE,
  LOAD_ORDERS_REQUEST,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
} from '../reducers/order';

// 시퀀스 초기화
function initializeSequenceAPI() {
  return axios.post('/order/sequence');
}
function* initializeSequence() {
  try {
    yield call(initializeSequenceAPI);
    yield put({
      type: INITIALIZE_SEQUENCE_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: INITIALIZE_SEQUENCE_FAILURE,
      error: err.response.data,
    });
  }
}

// 주문목록 불러오기
function loadOrdersAPI() {
  return axios.get(`/order`);
}
function* loadOrders() {
  try {
    const result = yield call(loadOrdersAPI);
    yield put({
      type: LOAD_ORDERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ORDERS_FAILURE,
      error: err.response.data,
    });
  }
}

// 주문 추가
function addOrderAPI(data) {
  return axios.post('/order/addOrder', data);
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

// 결제
function paymentAPI() {
  return axios.patch('/order/payment');
}
function* payment(action) {
  try {
    const result = yield call(paymentAPI, action.data);
    yield put({
      type: PAYMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PAYMENT_FAILURE,
      error: err.response.data,
    });
  }
}

// 스테이터스 변경
function updateStatusAPI() {
  return axios.patch('/order/status');
}
function* updateStatus(action) {
  try {
    const result = yield call(updateStatusAPI, action.data);
    yield put({
      type: UPDATE_STATUS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_STATUS_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchInitializeSequence() {
  yield takeLatest(INITIALIZE_SEQUENCE_REQUEST, initializeSequence);
}
function* watchLoadOrders() {
  yield takeLatest(LOAD_ORDERS_REQUEST, loadOrders);
}
function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
}
function* watchPayment() {
  yield takeLatest(PAYMENT_REQUEST, payment);
}
function* watchUpdateStatus() {
  yield takeLatest(UPDATE_STATUS_REQUEST, updateStatus);
}

export default function* userSaga() {
  yield all([
    fork(watchInitializeSequence),
    fork(watchLoadOrders),
    fork(watchAddOrder),
    fork(watchPayment),
    fork(watchUpdateStatus),
  ]);
}
