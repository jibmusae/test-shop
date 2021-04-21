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
  user: null,
  signUpData: {},
  loginData: {},
};

// 더미 유저
const dummyUser = (data) => ({
  ...data,
  corporateName: '테스트 회사명',
  name: '테스트 이름',
  corporateId: '000-00-00000',
  zipCode: '00000',
  address: '테스트 주소',
  addressDetail: '테스트 상세주소',
  tel: '000-0000-0000',
  email: 'test@test.test',
  isAdmin: true,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 로그인
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        user: dummyUser(action.data),
      };
    case LOGIN_FAILURE:
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
    default:
      return state;
  }
};

export default reducer;
