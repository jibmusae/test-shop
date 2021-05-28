import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import order from './order';
import inquire from './inquire';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default:
      const combineReducer = combineReducers({
        user,
        item,
        order,
        inquire,
      });
      return combineReducer(state, action);
  }
};

export default rootReducer;
