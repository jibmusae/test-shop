import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_INQUIRE_REQUEST,
  ADD_INQUIRE_SUCCESS,
  ADD_INQUIRE_FAILURE,
  UPDATE_INQUIRE_REQUEST,
  UPDATE_INQUIRE_SUCCESS,
  UPDATE_INQUIRE_FAILURE,
  REMOVE_INQUIRE_REQUEST,
  REMOVE_INQUIRE_SUCCESS,
  REMOVE_INQUIRE_FAILURE,
} from '../reducers/inquire';

// API
function addInquireAPI(data) {
  return axios.post('/api/addInquire', data);
}
function updateInquireAPI(data) {
  return axios.post('/api/updateInquire', data);
}
function removeAPI(data) {
  return axios.post('/api/removeInquire', data);
}

// 문의 작성
function* addInquire(action) {
  try {
    // 서버 필요
    // const result = yield call(addInquireAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_INQUIRE_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의 수정
function* updateInquire(action) {
  try {
    // 서버 필요
    // const result = yield call(updateInquireAPI, action.data);
    yield delay(1000);
    yield put({
      type: UPDATE_INQUIRE_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의 삭제
function* removeInquire(action) {
  try {
    // 서버 필요
    // const result = yield call(removeInquireAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_INQUIRE_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchAddInquire() {
  yield takeLatest(ADD_INQUIRE_REQUEST, addInquire);
}
function* watchUpdateInquire() {
  yield takeLatest(UPDATE_INQUIRE_REQUEST, updateInquire);
}
function* watchRemoveInquire() {
  yield takeLatest(REMOVE_INQUIRE_REQUEST, removeInquire);
}

export default function* userSaga() {
  yield all([
    fork(watchAddInquire),
    fork(watchUpdateInquire),
    fork(watchRemoveInquire),
  ]);
}
