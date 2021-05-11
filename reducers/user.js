import produce from 'immer';

// 이전상태
export const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  addCartLoading: false,
  addCartDone: false,
  addCartError: null,
  updateCartLoading: false,
  updateCartDone: false,
  updateCartError: null,
  removeCartLoading: false,
  removeCartDone: false,
  removeCartError: null,
  itemCheckLoading: false,
  itemCheckDone: false,
  itemCheckError: null,
  allCheckLoading: false,
  allCheckDone: false,
  allCheckError: null,
  user: null,
  signUpData: {},
  loginData: {},
};

// 변수
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const ADD_CART_REQUEST = 'ADD_CART_REQUEST';
export const ADD_CART_SUCCESS = 'ADD_CART_SUCCESS';
export const ADD_CART_FAILURE = 'ADD_CART_FAILURE';
export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';
export const REMOVE_CART_REQUEST = 'REMOVE_CART_REQUEST';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILURE = 'REMOVE_CART_FAILURE';

export const ITEM_CHECK_REQUEST = 'ITEM_CHECK_REQUEST';
export const ITEM_CHECK_SUCCESS = 'ITEM_CHECK_SUCCESS';
export const ITEM_CHECK_FAILURE = 'ITEM_CHECK_FAILURE';
export const ALL_CHECK_REQUEST = 'ALL_CHECK_REQUEST';
export const ALL_CHECK_SUCCESS = 'ALL_CHECK_SUCCESS';
export const ALL_CHECK_FAILURE = 'ALL_CHECK_FAILURE';

// 로그인 액션
export const loginRequestAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

// 로그아웃 액션
export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

// 회원가입 액션
export const signupRequestAction = (data) => ({
  type: SIGNUP_REQUEST,
  data,
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

// 장바구니 상품 체크 액션
export const itemCheckRequestAction = (data) => ({
  type: ITEM_CHECK_REQUEST,
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
      // 로그인
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      // 로그아웃
      case LOGOUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOGOUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.user = null;
        break;
      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
        break;
      // 회원가입
      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;

      // 장바구니 추가
      case ADD_CART_REQUEST:
        console.log(action);
        draft.addCartLoading = true;
        draft.addCartDone = false;
        draft.addCartError = null;
        break;
      case ADD_CART_SUCCESS:
        draft.user.cart.unshift(dummyCart(action.data));
        draft.addCartLoading = false;
        draft.addCartDone = true;
        break;
      case ADD_CART_FAILURE:
        draft.addCartLoading = false;
        draft.addCartError = action.error;
        break;
      // 장바구니 수정
      case UPDATE_CART_REQUEST:
        console.log(action);
        draft.updateCartLoading = true;
        draft.updateCartDone = false;
        draft.updateCartError = null;
        break;
      case UPDATE_CART_SUCCESS:
        const cartItem = draft.user.cart.find(
          (v) => v.itemId === action.data.itemId
        );
        cartItem.itemCount = action.data.itemCount;
        cartItem.itemAmount = action.data.itemCount * cartItem.itemPrice;
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
        draft.user.cart = draft.user.cart.filter(
          (v) => v.itemId !== action.data
        );
        draft.removeCartLoading = false;
        draft.removeCartDone = true;
        break;
      case REMOVE_CART_FAILURE:
        draft.removeCartLoading = false;
        draft.removeCartError = action.error;
        break;

      // 장바구니 상품 체크
      case ITEM_CHECK_REQUEST:
        draft.itemCheckLoading = true;
        draft.itemCheckDone = false;
        draft.itemCheckError = null;
        break;
      case ITEM_CHECK_SUCCESS:
        console.log(action);
        const itemCheckTargetCart = draft.user.cart.find(
          (v) => v.itemId === action.data.itemId
        );
        itemCheckTargetCart.itemChecked = action.data.itemChecked;
        draft.itemCheckLoading = false;
        draft.itemCheckDone = true;
        break;
      case ITEM_CHECK_FAILURE:
        draft.itemCheckLoading = false;
        draft.itemCheckError = action.error;
        break;

      // 장바구니 전체 체크
      case ALL_CHECK_REQUEST:
        console.log(action);
        draft.allCheckLoading = true;
        draft.allCheckDone = false;
        draft.allCheckError = null;
        break;
      case ALL_CHECK_SUCCESS:
        console.log(action);
        draft.user.cart.map((v) => (v.itemChecked = action.data));
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
