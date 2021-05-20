import produce from 'immer';

// 이전상태
export const initialState = {
  loadItemsLoading: false,
  loadItemsDone: false,
  loadItemsError: null,
  addItemLoading: false,
  addItemDone: false,
  addItemError: null,
  removeItemLoading: false,
  removeItemDone: false,
  removeItemError: null,
  mainItems: [],
};

// 변수
export const LOAD_ITEMS_REQUEST = 'LOAD_ITEMS_REQUEST';
export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_FAILURE = 'LOAD_ITEMS_FAILURE';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

// 상품 리스트 불러오기 액션
export const loadItemsRequestAction = (data) => ({
  type: LOAD_ITEMS_REQUEST,
  data,
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
      // 상품 리스트 불러오기
      case LOAD_ITEMS_REQUEST:
        draft.loadItemsLoading = true;
        draft.loadItemsDone = false;
        draft.loadItemsError = null;
        break;
      case LOAD_ITEMS_SUCCESS:
        draft.loadItemsLoading = false;
        draft.loadItemsDone = true;
        draft.mainItems = action.data;
        break;
      case LOAD_ITEMS_FAILURE:
        draft.loadItemsLoading = false;
        draft.loadItemsError = action.error;
        break;

      // 상품 추가
      case ADD_ITEM_REQUEST:
        draft.addItemLoading = true;
        draft.addItemDone = false;
        draft.addItemError = null;
        break;
      case ADD_ITEM_SUCCESS:
        draft.addItemLoading = false;
        draft.addItemDone = true;
        draft.mainItems.unshift(action.data);
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
