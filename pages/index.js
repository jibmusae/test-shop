import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import InProgress from '../components/InProgress';

export default function Home() {
  // const { mainItems } = useSelector((state) => state.item);

  return (
    <AppLayout>
      {/* {mainItems.map((item) => ( */}
      <InProgress
      //  key={item.id} item={item}
      />
      {/* ))} */}
    </AppLayout>
  );
}
