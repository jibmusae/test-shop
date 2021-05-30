import produce from 'immer';

// 이전상태
export const initialState = {
  loadInquiresLoading: false,
  loadInquiresDone: false,
  loadInquiresError: null,
  loadInquireByIdLoading: false,
  loadInquireByIdDone: false,
  loadInquireByIdError: null,
  addInquireLoading: false,
  addInquireDone: false,
  addInquireError: null,
  updateInquireLoading: false,
  updateInquireDone: false,
  updateInquireError: null,
  removeInquireLoading: false,
  removeInquireDone: false,
  removeInquireError: null,
  addAnswerLoading: false,
  addAnswerDone: false,
  addAnswerError: null,
  updateAnswerLoading: false,
  updateAnswerDone: false,
  updateAnswerError: null,
  removeAnswerLoading: false,
  removeAnswerDone: false,
  removeAnswerError: null,
  mainInquire: [],
  thisInquire: null,
};

// 변수
export const LOAD_INQUIRE_BY_ID_REQUEST = 'LOAD_INQUIRE_BY_ID_REQUEST';
export const LOAD_INQUIRE_BY_ID_SUCCESS = 'LOAD_INQUIRE_BY_ID_SUCCESS';
export const LOAD_INQUIRE_BY_ID_FAILURE = 'LOAD_INQUIRE_BY_ID_FAILURE';
export const LOAD_INQUIRES_REQUEST = 'LOAD_INQUIRES_REQUEST';
export const LOAD_INQUIRES_SUCCESS = 'LOAD_INQUIRES_SUCCESS';
export const LOAD_INQUIRES_FAILURE = 'LOAD_INQUIRES_FAILURE';

export const ADD_INQUIRE_REQUEST = 'ADD_INQUIRE_REQUEST';
export const ADD_INQUIRE_SUCCESS = 'ADD_INQUIRE_SUCCESS';
export const ADD_INQUIRE_FAILURE = 'ADD_INQUIRE_FAILURE';
export const UPDATE_INQUIRE_REQUEST = 'UPDATE_INQUIRE_REQUEST';
export const UPDATE_INQUIRE_SUCCESS = 'UPDATE_INQUIRE_SUCCESS';
export const UPDATE_INQUIRE_FAILURE = 'UPDATE_INQUIRE_FAILURE';
export const REMOVE_INQUIRE_REQUEST = 'REMOVE_INQUIRE_REQUEST';
export const REMOVE_INQUIRE_SUCCESS = 'REMOVE_INQUIRE_SUCCESS';
export const REMOVE_INQUIRE_FAILURE = 'REMOVE_INQUIRE_FAILURE';

export const ADD_ANSWER_REQUEST = 'ADD_ANSWER_REQUEST';
export const ADD_ANSWER_SUCCESS = 'ADD_ANSWER_SUCCESS';
export const ADD_ANSWER_FAILURE = 'ADD_ANSWER_FAILURE';
export const UPDATE_ANSWER_REQUEST = 'UPDATE_ANSWER_REQUEST';
export const UPDATE_ANSWER_SUCCESS = 'UPDATE_ANSWER_SUCCESS';
export const UPDATE_ANSWER_FAILURE = 'UPDATE_ANSWER_FAILURE';
export const REMOVE_ANSWER_REQUEST = 'REMOVE_ANSWER_REQUEST';
export const REMOVE_ANSWER_SUCCESS = 'REMOVE_ANSWER_SUCCESS';
export const REMOVE_ANSWER_FAILURE = 'REMOVE_ANSWER_FAILURE';

// 전체 문의글 불러오기
export const loadInquiresRequest = (data) => ({
  type: LOAD_INQUIRES_REQUEST,
  data,
});

// 문의글 불러오기
export const loadInquireByIdRequest = (data) => ({
  type: LOAD_INQUIRE_BY_ID_REQUEST,
  data,
});

// 문의 작성 액션
export const addInquireRequestAction = (data) => ({
  type: ADD_INQUIRE_REQUEST,
  data,
});

// 문의 수정 액션
export const updateInquireRequestAction = (data) => ({
  type: UPDATE_INQUIRE_REQUEST,
  data,
});

// 문의 제거 액션
export const removeInquireRequestAction = (data) => ({
  type: REMOVE_INQUIRE_REQUEST,
  data,
});

// 답변 등록 액션
export const addAnswerRequestAction = (data) => ({
  type: ADD_ANSWER_REQUEST,
  data,
});

// 답변 수정 액션
export const updateAnswerRequestAction = (data) => ({
  type: UPDATE_ANSWER_REQUEST,
  data,
});

// 답변 삭제 액션
export const removeAnswerRequestAction = (data) => ({
  type: REMOVE_ANSWER_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 전체 문의글 불러오기
      case LOAD_INQUIRES_REQUEST:
        draft.loadInquiresLoading = true;
        draft.loadInquiresDone = false;
        draft.loadInquiresError = null;
        break;
      case LOAD_INQUIRES_SUCCESS:
        draft.loadInquiresLoading = false;
        draft.loadInquiresDone = true;
        draft.mainInquire = action.data;
        break;
      case LOAD_INQUIRES_FAILURE:
        draft.loadInquiresLoading = false;
        draft.loadInquiresError = action.error;
        break;
      // 문의글 불러오기
      case LOAD_INQUIRE_BY_ID_REQUEST:
        draft.loadInquireByIdLoading = true;
        draft.loadInquireByIdDone = false;
        draft.loadInquireByIdError = null;
        break;
      case LOAD_INQUIRE_BY_ID_SUCCESS:
        draft.loadInquireByIdLoading = false;
        draft.loadInquireByIdDone = true;
        draft.thisInquire = action.data;
        break;
      case LOAD_INQUIRE_BY_ID_FAILURE:
        draft.loadInquireByIdLoading = false;
        draft.loadInquireByIdError = action.error;
        break;

      // 문의 작성
      case ADD_INQUIRE_REQUEST:
        draft.addInquireLoading = true;
        draft.addInquireDone = false;
        draft.addInquireError = null;
        break;
      case ADD_INQUIRE_SUCCESS:
        draft.addInquireLoading = false;
        draft.addInquireDone = true;
        draft.mainInquire.unshift(action.data);
        break;
      case ADD_INQUIRE_FAILURE:
        draft.addInquireLoading = false;
        draft.addInquireError = action.error;
        break;
      // 문의 수정
      case UPDATE_INQUIRE_REQUEST:
        draft.updateInquireLoading = true;
        draft.updateInquireDone = false;
        draft.updateInquireError = null;
        break;
      case UPDATE_INQUIRE_SUCCESS:
        draft.thisInquire = action.data;
        draft.updateInquireLoading = false;
        draft.updateInquireDone = true;
        break;
      case UPDATE_INQUIRE_FAILURE:
        draft.updateInquireLoading = false;
        draft.updateInquireError = action.error;
        break;
      // 문의 제거
      case REMOVE_INQUIRE_REQUEST:
        draft.removeInquireLoading = true;
        draft.removeInquireDone = false;
        draft.removeInquireError = null;
        break;
      case REMOVE_INQUIRE_SUCCESS:
        draft.mainInquire = draft.mainInquire.filter(
          (v) => v.inquire_id !== action.data.inquireId
        );
        draft.thisInquire = null;
        draft.removeInquireLoading = false;
        draft.removeInquireDone = true;
        break;
      case REMOVE_INQUIRE_FAILURE:
        draft.removeInquireLoading = false;
        draft.removeInquireError = action.error;
        break;

      // 답변 등록
      case ADD_ANSWER_REQUEST:
        draft.addAnswerLoading = true;
        draft.addAnswerDone = false;
        draft.addAnswerError = null;
        break;
      case ADD_ANSWER_SUCCESS:
        draft.thisInquire = action.data;
        draft.addAnswerLoading = false;
        draft.addAnswerDone = true;
        break;
      case ADD_ANSWER_FAILURE:
        draft.addAnswerLoading = false;
        draft.addAnswerError = action.error;
        break;
      // 답변 수정
      case UPDATE_ANSWER_REQUEST:
        draft.updateAnswerLoading = true;
        draft.updateAnswerDone = false;
        draft.updateAnswerError = null;
        break;
      case UPDATE_ANSWER_SUCCESS:
        draft.thisInquire = action.data;
        draft.updateAnswerLoading = false;
        draft.updateAnswerDone = true;
        break;
      case UPDATE_ANSWER_FAILURE:
        draft.updateAnswerLoading = false;
        draft.updateAnswerError = action.error;
        break;
      // 답변 삭제
      case REMOVE_ANSWER_REQUEST:
        draft.removeAnswerLoading = true;
        draft.removeAnswerDone = false;
        draft.removeAnswerError = null;
        break;
      case REMOVE_ANSWER_SUCCESS:
        draft.thisInquire.Answer = action.data;
        draft.removeAnswerLoading = false;
        draft.removeAnswerDone = true;
        break;
      case REMOVE_ANSWER_FAILURE:
        draft.removeAnswerLoading = false;
        draft.removeAnswerError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
