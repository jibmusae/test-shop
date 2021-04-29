import shortId from 'shortid';

// 이전상태
export const initialState = {
  addOrderLoading: false,
  addOrderDone: false,
  addOrderError: null,
  removeOrderLoading: false,
  removeOrderDone: false,
  removeOrderError: null,
  mainOrders: [
    {
      id: 2,
      userId: 1,
      orderDate: '20210429',
      amount: 1985270,
      item: [
        {
          itemId: 1,
          image: {
            src:
              'http://img.danawa.com/prod_img/500000/265/625/img/12625265_1.jpg?shrink=500:500&_v=20201105230016',
            alt: 'AMD Ryzen5 5600X',
          },

          itemName: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
          count: 3,
          price: 342090,
          orderStatus: 6, // 환불신청
          orderStatusKR: '환불신청',
          key: 23,
        },
        {
          itemId: 2,
          image: {
            src:
              'http://img.danawa.com/prod_img/500000/846/619/img/13619846_1.jpg?shrink=500:500&_v=20210317000027',
            alt: '인텔 i5 11400',
          },
          itemName: '인텔 코어i5-11세대 11400 (로켓레이크S) (정품)',
          count: 4,
          price: 239750,
          orderStatus: 3, // 배송준비
          orderStatusKR: '배송준비',
          key: 22,
        },
      ],
    },
    {
      id: 1,
      userId: 1,
      orderDate: '20210427',
      amount: 524940,
      item: [
        {
          itemId: 3,
          image: {
            src:
              'http://img.danawa.com/prod_img/500000/894/418/img/13418894_1.jpg?shrink=500:500&_v=20210315143301',
            alt: 'ASRock Z590 스틸레전드',
          },
          itemName: 'ASRock Z590 스틸레전드 디앤디컴',
          count: 2,
          price: 262470,
          orderStatus: 5, // 배송완료
          orderStatusKR: '배송완료',
          key: 13,
        },
      ],
    },
  ],
};

// 변수
export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

export const REMOVE_ORDER_REQUEST = 'REMOVE_ORDER_REQUEST';
export const REMOVE_ORDER_SUCCESS = 'REMOVE_ORDER_SUCCESS';
export const REMOVE_ORDER_FAILURE = 'REMOVE_ORDER_FAILURE';

// 더미 주문내역 테스트
const dummyOrders = (data) => ({
  id: shortId.generate(),
  userId: 1,
  orderDate: '20210429',
  item: [
    {
      itemId: 1,
      itemName: 'AMD 라이젠5-4세대 5600X (버미어) (멀티팩)',
      count: 16,
      price: 342090,
    },
    {
      itemId: 4,
      itemName: 'ASUS ROG STRIX 지포스 RTX 3090 O24G GAMING OC D6X 24GB',
      count: 6,
      price: 3420000,
    },
  ],
});

// 주문내역 추가 액션
export const addOrderRequestAction = (data) => ({
  type: ADD_ORDER_REQUEST,
  data,
});

// 주문내역 삭제 액션
export const removeOrderRequestAction = (data) => ({
  type: REMOVE_ORDER_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 주문내역 추가
    case ADD_ORDER_REQUEST:
      console.log('addOrder 주문이여유~');
      return {
        ...state,
        addOrderLoading: true,
        addOrderDone: false,
        addOrderError: null,
      };
    case ADD_ORDER_SUCCESS:
      console.log('addOrder 성공했어유~');
      return {
        ...state,
        addOrderLoading: false,
        addOrderDone: true,
        mainOrders: [dummyOrders(action.data), ...state.mainOrders],
      };
    case ADD_ORDER_FAILURE:
      console.log('addOrder 실패했어유~');
      return {
        ...state,
        addOrderLoading: false,
        addOrderError: action.error,
      };
    // 주문내역 삭제
    case REMOVE_ORDER_REQUEST:
      return {
        ...state,
        removeOrderLoading: true,
        removeOrderDone: false,
        removeOrderError: null,
      };
    case REMOVE_ORDER_SUCCESS:
      return {
        ...state,
        removeOrderLoading: false,
        removeOrderDone: true,
        // TODO 주문내역 삭제
        mainOrders: [...state.mainOrders],
      };
    case REMOVE_ORDER_FAILURE:
      return {
        ...state,
        removeOrderLoading: false,
        removeOrderError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
