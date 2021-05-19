import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_ITEMS_REQUEST,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILURE,
} from '../reducers/item';

// 상품 리스트 불러오기
function loadItemsAPI(data) {
  return axios.get('/item', data);
}
function* loadItems(action) {
  try {
    const result = yield call(loadItemsAPI, action.data);
    yield put({
      type: LOAD_ITEMS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_ITEMS_FAILURE,
      error: err.response.data,
    });
  }
}

// 상품 추가
function addItemAPI(data) {
  return axios.post('/item/addItem', data);
}
function* addItem(action) {
  try {
    const result = yield call(addItemAPI, action.data);
    yield put({
      type: ADD_ITEM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ITEM_FAILURE,
      error: err.response.data,
    });
  }
}

// 상품 제거
function removeItemAPI(data) {
  return axios.post('/item/deleteItem', data);
}
function* removeItem(action) {
  try {
    const result = yield call(removeItemAPI, action.data);
    yield put({
      type: REMOVE_ITEM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ITEM_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchLoadItems() {
  yield takeLatest(LOAD_ITEMS_REQUEST, loadItems);
}
function* watchAddItem() {
  yield takeLatest(ADD_ITEM_REQUEST, addItem);
}
function* watchRemoveItem() {
  yield takeLatest(REMOVE_ITEM_REQUEST, removeItem);
}

export default function* userSaga() {
  yield all([fork(watchLoadItems), fork(watchAddItem), fork(watchRemoveItem)]);
}
