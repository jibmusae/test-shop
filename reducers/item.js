// 이전상태
export const initialState = {
  addItemLoading: false,
  addItemDone: false,
  addItemError: null,
  removeItemLoading: false,
  removeItemDone: false,
  removeItemError: null,
  mainItems: [
    {
      id: 1,
      category: 1,
      name: 'R5 5600X',
      image: {
        src:
          'http://img.danawa.com/prod_img/500000/851/621/img/12621851_1.jpg?shrink=360:360&_v=20201230123532',
      },
      price: 460000,
      startDate: '20210101',
      endDate: '20221231',
      content: '텍스트필드 테스트',
    },
  ],
};

// 변수
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

// 상품 추가 액션
export const addItemRequestAction = (data) => ({
  type: ADD_ITEM_REQUEST,
  data,
});

// 상품 제거 액션
export const removeItemRequestAction = () => ({
  type: REMOVE_ITEM_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 상품 추가
    case ADD_ITEM_REQUEST:
      return {
        ...state,
        addItemLoading: true,
        addItemDone: false,
        addItemError: null,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        addItemLoading: false,
        addItemDone: true,
        mainItems: [...state.mainItems, dummyItems],
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        addItemLoading: false,
        addItemError: action.error,
      };
    // 상품 제거
    case REMOVE_ITEM_REQUEST:
      return {
        ...state,
        removeItemLoading: true,
        removeItemDone: false,
        removeItemError: null,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        removeItemLoading: false,
        removeItemDone: true,
        // TODO 상품 제거
        mainItems: [...state.mainItems],
      };
    case REMOVE_ITEM_FAILURE:
      return {
        ...state,
        removeItemLoading: false,
        removeItemError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
