import shortId from 'shortid';
import produce from 'immer';

// 이전상태
export const initialState = {
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
  mainInquire: [
    {
      id: 1,
      title: '문의하기 테스트 타이틀',
      user: {
        id: 1,
        name: '작성자1',
        email: 'test@gmail.com',
        tel: '01012345678',
      },
      createDate: '20210411',
      status: 1,
      content: '문의하기 텍스트필드 테스트',
      answer: {
        date: '20210503',
        content: '테스트 답변내용',
      },
    },
  ],
};

// 변수
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

// 더미 문의 테스트
const dummyInquire = (data) => ({
  id: shortId.generate(),
  title: data.title,
  user: { name: data.name, email: data.email, tel: data.tel },
  createDate: data.createDate,
  status: 0,
  content: data.content,
  answer: {},
});

// 더미 답변 테스트
const dummyAnswer = (data) => ({
  date: data.createDate,
  content: data.answer,
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
      // 문의 작성
      case ADD_INQUIRE_REQUEST:
        draft.addInquireLoading = true;
        draft.addInquireDone = false;
        draft.addInquireError = null;
        break;
      case ADD_INQUIRE_SUCCESS:
        draft.addInquireLoading = false;
        draft.addInquireDone = true;
        draft.mainInquire.unshift(dummyInquire(action.data));
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
        const updateInquire = draft.mainInquire.find(
          (v) => v.id === action.data.id
        );
        updateInquire = dummyInquire(action.data);
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
          (v) => v.id !== action.data
        );
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
        console.log(action.data);
        const addTarget = draft.mainInquire.find(
          (v) => v.id === action.data.inquireId
        );
        addTarget.answer = dummyAnswer(action.data);
        addTarget.status = 1;
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
        const updateTarget = draft.mainInquire.find(
          (v) => v.id === action.data.inquireId
        );
        updateTarget.answer = dummyAnswer(action.data);
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
        // TODO 삭제
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
