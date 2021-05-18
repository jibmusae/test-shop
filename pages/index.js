import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import InProgress from '../components/InProgress';
import { loadMyInfoRequest } from '../reducers/user';

export default function Home() {
  // 로그인 정보
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  return (
    <AppLayout>
      <InProgress />
    </AppLayout>
  );
}
