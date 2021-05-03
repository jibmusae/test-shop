import shortid from 'shortid';
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
  user: null,
  signUpData: {},
  loginData: {},
};

// 더미 장바구니
const dummyCart = (data) => ({
  // itemId: data.item.id,
  itemId: shortid.generate(),
  itemName: data.item.title,
  itemImage: {
    src: data.item.image.src,
    alt: data.item.image.alt,
  },
  itemCount: data.count,
  itemAmount: data.item.price * data.count,
});

// 더미 유저
const dummyUser = (data) => ({
  ...data,
  id: 1,
  userId: data.id,
  password: data.password,
  corporateName: '와이디커넥트',
  name: '윤재원',
  corporateId: '4210102162',
  zipCode: '49103',
  address: '부산광역시 영도구 와치로 213',
  addressDetail: '상가 1층 105호',
  tel: '01068888444',
  email: 'ydconnectcorp@gmail.com',
  isAdmin: true,
  cart: [],
});

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
        draft.user = dummyUser(action.data);
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
        draft.addCartLoading = true;
        draft.addCartDone = false;
        draft.addCartError = null;
        break;
      // 장바구니 수정
      case UPDATE_CART_REQUEST:
        draft.updateCartLoading = true;
        draft.updateCartDone = false;
        draft.updateCartError = null;
        break;
      case UPDATE_CART_SUCCESS:
        const cartItem = draft.user.cart.find(
          (v) => v.itemId === action.data.itemId
        );
        cartItem.itemCount = action.data.count;
        draft.updateCartLoading = false;
        draft.updateCartDone = true;
        break;
      case UPDATE_CART_FAILURE:
        draft.updateCartLoading = true;
        draft.updateCartDone = false;
        draft.updateCartError = null;
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
        draft.removeCartLoading = true;
        draft.removeCartDone = false;
        draft.removeCartError = null;
        break;
      default:
        break;
    }
  });
};

export default reducer;
