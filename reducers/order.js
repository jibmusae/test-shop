import produce from 'immer';

// 이전상태
export const initialState = {
  initializeSequenceLoading: false,
  initializeSequenceDone: false,
  initializeSequenceError: null,
  addOrderLoading: false,
  addOrderDone: false,
  addOrderError: null,
  mainOrders: [],
};

// 변수
export const INITIALIZE_SEQUENCE_REQUEST = 'INITIALIZE_SEQUENCE_REQUEST';
export const INITIALIZE_SEQUENCE_SUCCESS = 'INITIALIZE_SEQUENCE_SUCCESS';
export const INITIALIZE_SEQUENCE_FAILURE = 'INITIALIZE_SEQUENCE_FAILURE';
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

// 시퀀스 초기화 액션
export const initializeSequenceRequestAction = () => ({
  type: INITIALIZE_SEQUENCE_REQUEST,
});

// 주문 추가 액션
export const addOrderRequestAction = (data) => ({
  type: ADD_ORDER_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 시퀀스 초기화
      case INITIALIZE_SEQUENCE_REQUEST:
        draft.initializeSequenceLoading = true;
        draft.initializeSequenceDone = false;
        draft.initializeSequenceError = null;
        break;
      case INITIALIZE_SEQUENCE_SUCCESS:
        draft.initializeSequenceLoading = false;
        draft.initializeSequenceDone = true;
        break;
      case INITIALIZE_SEQUENCE_FAILURE:
        draft.initializeSequenceLoading = false;
        draft.initializeSequenceError = action.error;
        break;

      // 주문 추가
      case ADD_ORDER_REQUEST:
        draft.addOrderLoading = true;
        draft.addOrderDone = false;
        draft.addOrderError = null;
        break;
      case ADD_ORDER_SUCCESS:
        draft.addOrderLoading = false;
        draft.addOrderDone = true;
        draft.mainOrders.unshift(action.data);
        break;
      case ADD_ORDER_FAILURE:
        draft.addOrderLoading = false;
        draft.addOrderError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
