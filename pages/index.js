import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import InProgress from '../components/InProgress';
import { loadMyInfoRequest } from '../reducers/user';
import { loadItemsRequestAction } from '../reducers/item';
import { loadInquiresRequest } from '../reducers/inquire';

export default function Home() {
  // 로그인 정보 및 각 데이터 불러오기
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMyInfoRequest());
    dispatch(loadItemsRequestAction());
    dispatch(loadInquiresRequest());
  }, []);

  return (
    <AppLayout>
      <InProgress />
    </AppLayout>
  );
}
