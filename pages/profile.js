import { useState, useCallback, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  InputGroup,
  Input,
  Flex,
  Button,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import PostCodeButton from '../components/PostCodeButton';
import { useSelector } from 'react-redux';
import Router from 'next/router';

export default function profile() {
  // 상태관리
  const { user } = useSelector((state) => state.user);

  // 페이지 이동
  useEffect(() => {
    if (!user) {
      Router.push('/');
    }
  }, [user]);

  // 우편번호
  const [isPostOpen, setIsPostOpen] = useState(false);
  const onClickDaumPost = () => {
    setIsPostOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const [zipCode, setZipCode] = useState(user?.zipCode);
  const onChangeZipCode = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  const [address, setAddress] = useState(user?.address);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);
  const [addressDetail, setAddressDetail] = useState(user?.addressDetail);
  const onChangeAddressDetail = useCallback((e) => {
    setAddressDetail(e.target.value);
  }, []);

  return (
    <AppLayout>
      <Tabs isFitted variant="enclosed-colored">
        {/* Tab Title */}
        <TabList mb="1rem">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>주문조회</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>개인정보</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h1" size="md">
              주문조회
            </Heading>
          </TabPanel>
          <TabPanel>
            {/* TODO 세션 유지시간 대응(5분) */}
            {/* <InputPassword /> */}
            <Heading as="h1" size="md">
              개인정보 설정
            </Heading>
            <Table my="1rem" size="sm" borderTop="1px">
              <Tbody>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    업체명
                  </Th>
                  <Td>{user?.corporateName}</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    대표자명
                  </Th>
                  <Td>{user?.name}</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    사업자 등록번호
                  </Th>
                  <Td>{user?.corporateId}</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    주소
                  </Th>
                  <Td>
                    <InputGroup>
                      <Input
                        mb={1}
                        mr={1}
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder="우편번호"
                        size="sm"
                        value={zipCode}
                        onChange={onChangeZipCode}
                        isReadOnly
                      />
                      <Button
                        w="120px"
                        size="sm"
                        color="gray"
                        onClick={onClickDaumPost}
                      >
                        우편번호 검색
                      </Button>
                      {isPostOpen && (
                        <PostCodeButton
                          setIsPostOpen={setIsPostOpen}
                          isPostOpen={isPostOpen}
                          setZipCode={setZipCode}
                          setAddress={setAddress}
                        />
                      )}
                    </InputGroup>
                    <Input
                      mb={1}
                      size="sm"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="주소"
                      value={address}
                      onChange={onChangeAddress}
                      isReadOnly
                    />
                    <Input
                      size="sm"
                      id="addressDetail"
                      name="addressDetail"
                      type="text"
                      placeholder="상세주소"
                      value={addressDetail}
                      onChange={onChangeAddressDetail}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    이메일
                  </Th>
                  <Td>{user?.email}</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    연락처
                  </Th>
                  <Td>{user?.tel}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Flex mt="2rem" justifyContent="center">
              <Button
                w="150px"
                size="md"
                colorScheme="blue"
                // onClick={onClickModify}
              >
                수정하기
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
