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

// 더미 유저
const dummyUser = (data) => ({
  ...data,
  id: 1,
  userId: data.id,
  password: data.password,
  isAdmin: true,
  corporateName: '와이디커넥트',
  name: '윤재원',
  corporateId: '4210102162',
  zipCode: '49103',
  address: '부산광역시 영도구 와치로 213',
  addressDetail: '상가 1층 105호',
  tel: '01068888444',
  email: 'ydconnectcorp@gmail.com',
  cart: [
    {
      item: {
        name: '테스트 아이템1',
      },
      content: '테스트 컨텐트',
    },
    {
      item: {
        name: '테스트 아이템2',
      },
      content: '테스트 컨텐트2',
    },
  ],
});

// 더미 장바구니
// const dummyCart = (data) => ({
//   ...data,
//   cart: {
//     id: 1,
//     itemId: 1,
//     itemName: 'test',
//     itemImage: {
//       src: '',
//       alt: '테스트alt',
//     },
//     itemCount: 3,
//     itemPrice: 999999,
//   },
// });

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
  switch (action.type) {
    // 로그인
    case LOGIN_REQUEST:
      console.log('login 주문이여유~');
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      console.log('login 성공했어유~');
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        user: dummyUser(action.data),
      };
    case LOGIN_FAILURE:
      console.log('login 실패했어유~');
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    // 로그아웃
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        user: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };
    // 회원가입
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };
    // 장바구니 추가
    case ADD_CART_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
