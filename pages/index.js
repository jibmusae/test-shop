import axios from 'axios';
import { END } from '@redux-saga/core';
import AppLayout from '../components/AppLayout';
import InProgress from '../components/InProgress';
import wrapper from '../store/configureStore';
import { loadMyInfoRequest } from '../reducers/user';
import { loadItemsRequestAction } from '../reducers/item';

const Home = () => {
  return (
    <AppLayout>
      <InProgress />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(loadItemsRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
