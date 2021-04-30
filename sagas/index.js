import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import itemSaga from './item';
import orderSaga from './order';
import inquireSaga from './inquire';
import cartSaga from './cart';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(itemSaga),
    fork(orderSaga),
    fork(inquireSaga),
    fork(cartSaga),
  ]);
}
