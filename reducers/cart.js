import produce from 'immer';

export const initialState = {
  loadMyCartLoading: false,
  loadMyCartDone: false,
  loadMyCartError: null,
  addCartLoading: false,
  addCartDone: false,
  addCartError: null,
  updateCartLoading: false,
  updateCartDone: false,
  updateCartError: null,
  removeCartLoading: false,
  removeCartDone: false,
  removeCartError: null,
  allCheckLoading: false,
  allCheckDone: false,
  allCheckError: null,
  myCart: [],
};

// 변수
export const LOAD_MY_CART_REQUEST = 'LOAD_MY_CART_REQUEST';
export const LOAD_MY_CART_SUCCESS = 'LOAD_MY_CART_SUCCESS';
export const LOAD_MY_CART_FAILURE = 'LOAD_MY_CART_FAILURE';
export const ADD_CART_REQUEST = 'ADD_CART_REQUEST';
export const ADD_CART_SUCCESS = 'ADD_CART_SUCCESS';
export const ADD_CART_FAILURE = 'ADD_CART_FAILURE';
export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';
export const REMOVE_CART_REQUEST = 'REMOVE_CART_REQUEST';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILURE = 'REMOVE_CART_FAILURE';

export const ALL_CHECK_REQUEST = 'ALL_CHECK_REQUEST';
export const ALL_CHECK_SUCCESS = 'ALL_CHECK_SUCCESS';
export const ALL_CHECK_FAILURE = 'ALL_CHECK_FAILURE';

// 내 장바구니 불러오기 액션
export const loadMyCartRequestAction = () => ({
  type: LOAD_MY_CART_REQUEST,
});
// 장바구니 추가 액션
export const addCartRequestAction = (data) => ({
  type: ADD_CART_REQUEST,
  data,
});
// 장바구니 수정 액션
export const updateCartRequestAction = (data) => ({
  type: UPDATE_CART_REQUEST,
  data,
});
// 장바구니 삭제 액션
export const removeCartRequestAction = (data) => ({
  type: REMOVE_CART_REQUEST,
  data,
});
// 장바구니 전체 체크 액션
export const allCheckRequestAction = (data) => ({
  type: ALL_CHECK_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 내 장바구니 불러오기
      case LOAD_MY_CART_REQUEST:
        draft.loadMyCartLoading = true;
        draft.loadMyCartDone = false;
        draft.loadMyCartError = null;
        break;
      case LOAD_MY_CART_SUCCESS:
        draft.myCart = action.data;
        draft.loadMyCartLoading = false;
        draft.loadMyCartDone = true;
        break;
      case LOAD_MY_CART_FAILURE:
        draft.loadMyCartLoading = false;
        draft.loadMyCartError = action.error;
        break;
      // 장바구니 추가
      case ADD_CART_REQUEST:
        draft.addCartLoading = true;
        draft.addCartDone = false;
        draft.addCartError = null;
        break;
      case ADD_CART_SUCCESS:
        draft.myCart = action.data;
        draft.addCartLoading = false;
        draft.addCartDone = true;
        break;
      case ADD_CART_FAILURE:
        draft.addCartLoading = false;
        draft.addCartError = action.error;
        break;
      // 장바구니 수정
      case UPDATE_CART_REQUEST:
        draft.updateCartLoading = true;
        draft.updateCartDone = false;
        draft.updateCartError = null;
        break;
      case UPDATE_CART_SUCCESS:
        draft.myCart = action.data;
        draft.updateCartLoading = false;
        draft.updateCartDone = true;
        break;
      case UPDATE_CART_FAILURE:
        draft.updateCartLoading = false;
        draft.updateCartError = action.error;
        break;
      // 장바구니 제거
      case REMOVE_CART_REQUEST:
        draft.removeCartLoading = true;
        draft.removeCartDone = false;
        draft.removeCartError = null;
        break;
      case REMOVE_CART_SUCCESS:
        draft.myCart = draft.myCart.filter(
          (v) => v.cart_id !== action.data.cart_id
        );
        draft.removeCartLoading = false;
        draft.removeCartDone = true;
        break;
      case REMOVE_CART_FAILURE:
        draft.removeCartLoading = false;
        draft.removeCartError = action.error;
        break;

      // 전체 체크
      case ALL_CHECK_REQUEST:
        draft.allCheckLoading = true;
        draft.allCheckDone = false;
        draft.allCheckError = null;
        break;
      case ALL_CHECK_SUCCESS:
        draft.myCart = action.data;
        draft.allCheckLoading = false;
        draft.allCheckDone = true;
        break;
      case ALL_CHECK_FAILURE:
        draft.allCheckLoading = false;
        draft.allCheckError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
