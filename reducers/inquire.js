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
  mainInquire: [
    {
      id: 1,
      title: '문의하기 테스트 타이틀',
      user: { name: '작성자1', email: 'test@gmail.com', tel: '01012345678' },
      createDate: '20210411',
      status: 0,
      content: '문의하기 텍스트필드 테스트',
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
export const removeInquireRequestAction = () => ({
  type: REMOVE_INQUIRE_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 문의 작성
    case ADD_INQUIRE_REQUEST:
      return {
        ...state,
        addInquireLoading: true,
        addInquireDone: false,
        addInquireError: null,
      };
    case ADD_INQUIRE_SUCCESS:
      return {
        ...state,
        addInquireLoading: false,
        addInquireDone: true,
        mainInquire: [dummyInquire, ...state.mainInquire],
      };
    case ADD_INQUIRE_FAILURE:
      return {
        ...state,
        addInquireLoading: false,
        addInquireError: action.error,
      };
    // 문의 수정
    case UPDATE_INQUIRE_REQUEST:
      return {
        ...state,
        updateInquireLoading: true,
        updateInquireDone: false,
        updateInquireError: null,
      };
    case UPDATE_INQUIRE_SUCCESS:
      return {
        ...state,
        updateInquireLoading: false,
        updateInquireDone: true,
        // TODO
        mainInquire: [dummyInquire, ...state.mainInquire],
      };
    case UPDATE_INQUIRE_FAILURE:
      return {
        ...state,
        updateInquireLoading: false,
        updateInquireError: action.error,
      };
    // 문의 제거
    case REMOVE_INQUIRE_REQUEST:
      return {
        ...state,
        removeInquireLoading: true,
        removeInquireDone: false,
        removeInquireError: null,
      };
    case REMOVE_INQUIRE_SUCCESS:
      return {
        ...state,
        removeInquireLoading: false,
        removeInquireDone: true,
        // TODO
        mainInquire: [dummyInquire, ...state.mainInquire],
      };
    case REMOVE_INQUIRE_FAILURE:
      return {
        ...state,
        removeInquireLoading: false,
        removeInquireError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
