import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
} from '../reducers/item';

// API
function addItemAPI(data) {
  return axios.post('/api/addItem', data);
}
function removeItemAPI(data) {
  return axios.post('/api/removeItem', data);
}

// 상품 추가
function* addItem(action) {
  try {
    // 서버 필요
    // const result = yield call(addItemAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_ITEM_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ITEM_FAILURE,
      error: err.response.data,
    });
  }
}

// 상품 제거
function* removeItem(action) {
  try {
    // 서버 필요
    // const result = yield call(removeItemAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_ITEM_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ITEM_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchAddItem() {
  yield takeLatest(ADD_ITEM_REQUEST, addItem);
}
function* watchRemoveItem() {
  yield takeLatest(REMOVE_ITEM_REQUEST, removeItem);
}

export default function* userSaga() {
  yield all([fork(watchAddItem), fork(watchRemoveItem)]);
}
