import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import AddItemForm from './AddItemForm';
import ItemList from './itemList';

export default function InProgress() {
  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainItems } = useSelector((state) => state.item);

  // 상품추가 모달
  const [isAddItem, setIsAddItem] = useState(false);

  // 상품 카테고리
  const cpuArray = [];
  const mbArray = [];
  const vgaArray = [];
  const etcArray = [];

  mainItems.map((item) => {
    if (item.category === 1) {
      cpuArray.push(item);
    } else if (item.category === 2) {
      mbArray.push(item);
    } else if (item.category === 3) {
      vgaArray.push(item);
    } else {
      etcArray.push(item);
    }
  });

  return (
    <>
      <Flex>
        <Heading
          flex="1"
          as="h1"
          size="lg"
          mb="2rem"
          fontFamily="noto"
          textAlign="center"
          color="#212529" // GRAY 9
        >
          진행중인 상품
        </Heading>
        {user?.isAdmin && (
          <AddItemForm setIsAddItem={setIsAddItem} isAddItem={isAddItem} />
        )}
      </Flex>
      <Tabs isFitted variant="enclosed-colored">
        {/* Tab Title */}
        <TabList mb="1rem">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>CPU</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>메인보드</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>그래픽카드</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>그 외</Tab>
        </TabList>

        {/* Tab Detail */}
        <TabPanels>
          {/* CPU */}
          <TabPanel>
            {cpuArray.length !== 0 ? (
              cpuArray.map((item) => <ItemList key={item.id} item={item} />)
            ) : (
              <Flex
                m="1rem"
                p="1.5rem"
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="base"
              >
                진행중인 상품이 없습니다.
              </Flex>
            )}
          </TabPanel>

          {/* 메인보드 */}
          <TabPanel>
            {mbArray.length !== 0 ? (
              mbArray.map((item) => <ItemList key={item.id} item={item} />)
            ) : (
              <Flex
                m="1rem"
                p="1.5rem"
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="base"
              >
                진행중인 상품이 없습니다.
              </Flex>
            )}
          </TabPanel>

          {/* 그래픽카드 */}
          <TabPanel>
            {vgaArray.length !== 0 ? (
              vgaArray.map((item) => <ItemList key={item.id} item={item} />)
            ) : (
              <Flex
                m="1rem"
                p="1.5rem"
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="base"
              >
                진행중인 상품이 없습니다.
              </Flex>
            )}
          </TabPanel>

          {/* 그 외 */}
          <TabPanel>
            {etcArray.length !== 0 ? (
              etcArray.map((item) => <ItemList key={item.id} item={item} />)
            ) : (
              <Flex
                m="1rem"
                p="1.5rem"
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="base"
              >
                진행중인 상품이 없습니다.
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
