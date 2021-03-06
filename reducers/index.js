import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import cart from './cart';
import order from './order';
import inquire from './inquire';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      const combineReducer = combineReducers({
        user,
        item,
        cart,
        order,
        inquire,
      });
      return combineReducer(state, action);
  }
};

export default rootReducer;
