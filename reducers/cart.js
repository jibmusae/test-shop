import shortId from 'shortid';

// 이전상태
export const initialState = {
  addCartLoading: false,
  addCartDone: false,
  addCartError: null,
  removeCartLoading: false,
  removeCartDone: false,
  removeCartError: null,
  mainCarts: [
    {
      id: 1,
      userId: 1,
      item: [
        {
          id: 1,
          image: {
            src:
              'http://img.danawa.com/prod_img/500000/265/625/img/12625265_1.jpg?shrink=500:500&_v=20201105230016',
            alt: 'AMD Ryzen5 5600X',
          },
          itemName: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
          count: 5,
          price: 342090,
          startDate: '20210101',
          endDate: '20221231',
        },
        {
          id: 2,
          image: {
            src:
              'http://img.danawa.com/prod_img/500000/846/619/img/13619846_1.jpg?shrink=500:500&_v=20210317000027',
            alt: '인텔 i5 11400',
          },
          itemName: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
          count: 4,
          price: 239750,
          startDate: '20210102',
          endDate: '20221230',
        },
      ],
    },
  ],
};

// 변수
export const ADD_CART_REQUEST = 'ADD_CART_REQUEST';
export const ADD_CART_SUCCESS = 'ADD_CART_SUCCESS';
export const ADD_CART_FAILURE = 'ADD_CART_FAILURE';

export const REMOVE_CART_REQUEST = 'REMOVE_CART_REQUEST';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILURE = 'REMOVE_CART_FAILURE';

// 더미 장바구니 테스트
const dummyCarts = (data) => ({
  id: shortId.generate(),
  userId: data.userId,
  item: [
    {
      id: 1,
      itemName: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/265/625/img/12625265_1.jpg?shrink=500:500&_v=20201105230016',
        alt: 'AMD Ryzen5 5600X',
      },
      price: 342090,
      startDate: '20210101',
      endDate: '20221231',
    },
  ],
});

// 장바구니 추가 액션
export const addCartRequestAction = (data) => ({
  type: ADD_CART_REQUEST,
  data,
});

// 장바구니 제거 액션
export const removeCartRequestAction = (data) => ({
  type: REMOVE_CART_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 장바구니 추가
    case ADD_CART_REQUEST:
      console.log('addCart 주문이여유~');
      return {
        ...state,
        addCartLoading: true,
        addCartDone: false,
        addCartError: null,
      };
    case ADD_CART_SUCCESS:
      console.log('addCart 성공했어유~');
      return {
        ...state,
        addCartLoading: false,
        addCartDone: true,
        mainCarts: [dummyCarts(action.data), ...state.mainCarts],
      };
    case ADD_CART_FAILURE:
      console.log('addCart 실패했어유~');
      return {
        ...state,
        addCartLoading: false,
        addCartError: action.error,
      };
    // 장바구니 제거
    case REMOVE_CART_REQUEST:
      return {
        ...state,
        removeCartLoading: true,
        removeCartDone: false,
        removeCartError: null,
      };
    case REMOVE_CART_SUCCESS:
      return {
        ...state,
        removeCartLoading: false,
        removeCartDone: true,
        // TODO 장바구니 제거
        mainCarts: [...state.mainCarts],
      };
    case REMOVE_CART_FAILURE:
      return {
        ...state,
        removeCartLoading: false,
        removeCartError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
