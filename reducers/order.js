import produce from 'immer';

// 이전상태
export const initialState = {
  initializeSequenceLoading: false,
  initializeSequenceDone: false,
  initializeSequenceError: null,
  loadOrdersLoading: false,
  loadOrdersDone: false,
  loadOrdersError: null,
  addOrderLoading: false,
  addOrderDone: false,
  addOrderError: null,
  paymentLoading: false,
  paymentDone: false,
  paymentError: null,
  updateStatusLoading: false,
  updateStatusDone: false,
  updateStatusError: null,
  mainOrders: [],
  thisOrder: [],
};

// 변수
export const INITIALIZE_SEQUENCE_REQUEST = 'INITIALIZE_SEQUENCE_REQUEST';
export const INITIALIZE_SEQUENCE_SUCCESS = 'INITIALIZE_SEQUENCE_SUCCESS';
export const INITIALIZE_SEQUENCE_FAILURE = 'INITIALIZE_SEQUENCE_FAILURE';
export const LOAD_ORDERS_REQUEST = 'LOAD_ORDERS_REQUEST';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_ORDERS_FAILURE = 'LOAD_ORDERS_FAILURE';
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';
export const PAYMENT_REQUEST = 'PAYMENT_REQUEST';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
export const UPDATE_STATUS_REQUEST = 'UPDATE_STATUS_REQUEST';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';

// 시퀀스 초기화 액션
export const initializeSequenceRequestAction = () => ({
  type: INITIALIZE_SEQUENCE_REQUEST,
});

// 주문 목록 불러오기 액션
export const loadOrdersRequestAction = () => ({
  type: LOAD_ORDERS_REQUEST,
});

// 주문 추가 액션
export const addOrderRequestAction = (data) => ({
  type: ADD_ORDER_REQUEST,
  data,
});

// 결제 액션
export const paymentRequestAction = () => ({
  type: PAYMENT_REQUEST,
});

// 스테이터스 변경 액션
export const updateStatusRequestAction = (data) => ({
  type: UPDATE_STATUS_REQUEST,
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

      // 주문 이력 불러오기
      case LOAD_ORDERS_REQUEST:
        draft.loadOrdersLoading = true;
        draft.loadOrdersDone = false;
        draft.loadOrdersError = null;
        break;
      case LOAD_ORDERS_SUCCESS:
        draft.loadOrdersLoading = false;
        draft.loadOrdersDone = true;
        draft.mainOrders = action.data;
        break;
      case LOAD_ORDERS_FAILURE:
        draft.loadOrdersLoading = false;
        draft.loadOrdersError = action.error;
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
      // 결제
      case PAYMENT_REQUEST:
        draft.paymentLoading = true;
        draft.paymentDone = false;
        draft.paymentError = null;
        break;
      case PAYMENT_SUCCESS:
        draft.paymentLoading = false;
        draft.paymentDone = true;
        draft.thisOrder = action.data;
        break;
      case PAYMENT_FAILURE:
        draft.paymentLoading = false;
        draft.paymentError = action.error;
        break;
      // 스테이터스 변경
      case UPDATE_STATUS_REQUEST:
        draft.updateStatusLoading = true;
        draft.updateStatusDone = false;
        draft.updateStatusError = null;
        break;
      case UPDATE_STATUS_SUCCESS:
        draft.updateStatusLoading = false;
        draft.updateStatusDone = true;
        draft.mainOrders = action.data;
        break;
      case UPDATE_STATUS_FAILURE:
        draft.updateStatusLoading = false;
        draft.updateStatusError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
