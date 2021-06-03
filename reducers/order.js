import produce from 'immer';

// 이전상태
export const initialState = {
  addOrderLoading: false,
  addOrderDone: false,
  addOrderError: null,
  mainOrders: [],
  tempOrders: [],
};

// 변수
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

export const ADD_TEMP_ORDER = 'ADD_TEMP_ORDER';

// 주문 추가 액션
export const addOrderRequestAction = (data) => ({
  type: ADD_ORDER_REQUEST,
  data,
});

// 임시주문 추가 액션
export const addTempOrderAction = (data) => ({
  type: ADD_TEMP_ORDER,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 주문 추가
      case ADD_ORDER_REQUEST:
        draft.addOrderLoading = true;
        draft.addOrderDone = false;
        draft.addOrderError = null;
        break;
      case ADD_ORDER_SUCCESS:
        draft.addOrderLoading = false;
        draft.addOrderDone = true;
        draft.mainOrders.unshift(dummyOrders(action.data));
        break;
      case ADD_ORDER_FAILURE:
        draft.addOrderLoading = false;
        draft.addOrderError = action.error;
        break;

      // 임시주문 추가
      case ADD_TEMP_ORDER:
        draft.tempOrders.unshift(action.data);
        break;
      default:
        break;
    }
  });
};

export default reducer;
