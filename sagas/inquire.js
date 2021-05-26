import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_INQUIRES_REQUEST,
  LOAD_INQUIRES_SUCCESS,
  LOAD_INQUIRES_FAILURE,
  ADD_INQUIRE_REQUEST,
  ADD_INQUIRE_SUCCESS,
  ADD_INQUIRE_FAILURE,
  UPDATE_INQUIRE_REQUEST,
  UPDATE_INQUIRE_SUCCESS,
  UPDATE_INQUIRE_FAILURE,
  REMOVE_INQUIRE_REQUEST,
  REMOVE_INQUIRE_SUCCESS,
  REMOVE_INQUIRE_FAILURE,
  ADD_ANSWER_REQUEST,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  UPDATE_ANSWER_REQUEST,
  UPDATE_ANSWER_SUCCESS,
  UPDATE_ANSWER_FAILURE,
  REMOVE_ANSWER_REQUEST,
  REMOVE_ANSWER_SUCCESS,
  REMOVE_ANSWER_FAILURE,
} from '../reducers/inquire';

// API
function updateAnswerAPI(data) {
  return axios.post('/api/updateAnswer', data);
}
function removeAnswerAPI(data) {
  return axios.post('/api/removeAnswer', data);
}

// 전체 문의글 불러오기
function loadInquiresAPI(data) {
  return axios.get('/inquire', data);
}
function* loadInquires(action) {
  try {
    const result = yield call(loadInquiresAPI, action.data);
    yield put({
      type: LOAD_INQUIRES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_INQUIRES_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의 작성
function addInquireAPI(data) {
  return axios.post('/inquire/addInquire', data);
}
function* addInquire(action) {
  try {
    const result = yield call(addInquireAPI, action.data);
    yield put({
      type: ADD_INQUIRE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의 수정
function updateInquireAPI(data) {
  return axios.patch(`/inquire/updateInquire`, { content: data });
}
function* updateInquire(action) {
  try {
    const result = yield call(updateInquireAPI, action.data);
    yield put({
      type: UPDATE_INQUIRE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 문의 삭제
function removeInquireAPI(data) {
  return axios.delete(`/inquire/${data}`);
}
function* removeInquire(action) {
  console.log(action);
  try {
    const result = yield call(removeInquireAPI, action.data);
    yield put({
      type: REMOVE_INQUIRE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_INQUIRE_FAILURE,
      error: err.response.data,
    });
  }
}

// 답변 등록
function addAnswerAPI(data) {
  console.log(data);
  return axios.patch(`/inquire/${data.inquire_id}/answer`, data);
}
function* addAnswer(action) {
  try {
    const result = yield call(addAnswerAPI, action.data);
    yield put({
      type: ADD_ANSWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_ANSWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 답변 수정
function* updateAnswer(action) {
  try {
    // 서버 필요
    // const result = yield call(updateAnswerAPI, action.data);
    yield delay(1000);
    yield put({
      type: UPDATE_ANSWER_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_ANSWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 답변 삭제
function* removeAnswer(action) {
  try {
    // 서버 필요
    // const result = yield call(removeAnswerAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_ANSWER_SUCCESS,
      // 서버 필요
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_ANSWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 리퀘스트
function* watchLoadInquires() {
  yield takeLatest(LOAD_INQUIRES_REQUEST, loadInquires);
}
function* watchAddInquire() {
  yield takeLatest(ADD_INQUIRE_REQUEST, addInquire);
}
function* watchUpdateInquire() {
  yield takeLatest(UPDATE_INQUIRE_REQUEST, updateInquire);
}
function* watchRemoveInquire() {
  yield takeLatest(REMOVE_INQUIRE_REQUEST, removeInquire);
}
function* watchAddAnswer() {
  yield takeLatest(ADD_ANSWER_REQUEST, addAnswer);
}
function* watchUpdateAnswer() {
  yield takeLatest(UPDATE_ANSWER_REQUEST, updateAnswer);
}
function* watchRemoveAnswer() {
  yield takeLatest(REMOVE_ANSWER_REQUEST, removeAnswer);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadInquires),
    fork(watchAddInquire),
    fork(watchUpdateInquire),
    fork(watchRemoveInquire),
    fork(watchAddAnswer),
    fork(watchUpdateAnswer),
    fork(watchRemoveAnswer),
  ]);
}
