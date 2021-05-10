import shortId from 'shortid';
import produce from 'immer';

// 이전상태
export const initialState = {
  addItemLoading: false,
  addItemDone: false,
  addItemError: null,
  removeItemLoading: false,
  removeItemDone: false,
  removeItemError: null,
  mainItems: [],
};

// 변수
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

// 더미 아이템 테스트
const dummyItems = (data) => ({
  id: shortId.generate(),
  category: data.category,
  title: data.title,
  image: {
    src: data.image,
    alt: data.imageAlt,
  },
  price: data.price,
  startDate: data.startDate,
  endDate: data.endDate,
  content: data.content,
});

// 상품 추가 액션
export const addItemRequestAction = (data) => ({
  type: ADD_ITEM_REQUEST,
  data,
});

// 상품 제거 액션
export const removeItemRequestAction = (data) => ({
  type: REMOVE_ITEM_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 상품 추가
      case ADD_ITEM_REQUEST:
        draft.addItemLoading = true;
        draft.addItemDone = false;
        draft.addItemError = null;
        break;
      case ADD_ITEM_SUCCESS:
        draft.addItemLoading = false;
        draft.addItemDone = true;
        draft.mainItems.unshift(dummyItems(action.data));
        break;
      case ADD_ITEM_FAILURE:
        draft.addItemLoading = false;
        draft.addItemError = action.error;
        break;
      // 상품 제거
      case REMOVE_ITEM_REQUEST:
        draft.removeItemLoading = true;
        draft.removeItemDone = false;
        draft.removeItemError = null;
        break;
      case REMOVE_ITEM_SUCCESS:
        draft.removeItemLoading = false;
        draft.removeItemDone = true;
        draft.mainItems = draft.mainItems.filter((v) => v.id !== action.data);
        break;
      case REMOVE_ITEM_FAILURE:
        draft.removeItemLoading = false;
        draft.removeItemError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
