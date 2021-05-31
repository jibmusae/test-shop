import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_INQUIRES_REQUEST,
  LOAD_INQUIRES_SUCCESS,
  LOAD_INQUIRES_FAILURE,
  LOAD_INQUIRE_BY_ID_REQUEST,
  LOAD_INQUIRE_BY_ID_SUCCESS,
  LOAD_INQUIRE_BY_ID_FAILURE,
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

// 문의글 불러오기
function loadInquireByIdAPI(data) {
  return axios.get(`/inquire/${data}`);
}
function* loadInquireById(action) {
  try {
    const result = yield call(loadInquireByIdAPI, action.data);
    yield put({
      type: LOAD_INQUIRE_BY_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_INQUIRE_BY_ID_FAILURE,
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
  return axios.patch(`/inquire/${data.inquireId}`, data);
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
  return axios.post(`/inquire/${data.inquireId}/addAnswer`, data);
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
function updateAnswerAPI(data) {
  return axios.patch(`/inquire/${data.inquireId}/${data.answerId}`, data);
}
function* updateAnswer(action) {
  try {
    const result = yield call(updateAnswerAPI, action.data);
    yield put({
      type: UPDATE_ANSWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_ANSWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 답변 삭제
function removeAnswerAPI(data) {
  return axios.delete(`/inquire/${data.inquireId}/${data.answerId}`);
}
function* removeAnswer(action) {
  try {
    const result = yield call(removeAnswerAPI, action.data);
    yield put({
      type: REMOVE_ANSWER_SUCCESS,
      data: result.data,
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
function* watchLoadInquireById() {
  yield takeLatest(LOAD_INQUIRE_BY_ID_REQUEST, loadInquireById);
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
    fork(watchLoadInquireById),
    fork(watchAddInquire),
    fork(watchUpdateInquire),
    fork(watchRemoveInquire),
    fork(watchAddAnswer),
    fork(watchUpdateAnswer),
    fork(watchRemoveAnswer),
  ]);
}
