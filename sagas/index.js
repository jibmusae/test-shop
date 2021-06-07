import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import itemSaga from './item';
import cartSaga from './cart';
import orderSaga from './order';
import inquireSaga from './inquire';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(itemSaga),
    fork(cartSaga),
    fork(orderSaga),
    fork(inquireSaga),
  ]);
}
