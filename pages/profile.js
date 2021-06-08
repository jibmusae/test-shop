import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from '@redux-saga/core';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Table,
  Tbody,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import PostCode from '../components/PostCode';
import OrderList from '../components/OrderList';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import { loadMyInfoRequest } from '../reducers/user';
import { loadOrdersRequestAction } from '../reducers/order';

const profileSchema = yup.object().shape({
  corporateName: yup
    .string()
    .required('업체명을 입력해주세요')
    .max(100, '업체명은 최대 100자 이내로 입력해주세요'),
  name: yup
    .string()
    .required('대표자명을 입력해주세요')
    .min(2, '대표자명은 최소 2자, 최대 100자로 입력해주세요')
    .max(100, '대표자명은 최소 2자, 최대 100자로 입력해주세요'),
  corporateId: yup
    .string()
    .required('사업자 등록번호를 입력해주세요')
    .min(12, '사업자 등록번호는 하이픈 포함 12자로 입력해주세요')
    .max(12, '사업자 등록번호는 하이픈 포함 12자로 입력해주세요'),
  zipCode: yup
    .string()
    .required('우편번호를 검색해주세요')
    .min(5, '우편번호는 5자로 입력해주세요')
    .max(5, '우편번호는 5자로 입력해주세요'),
  addressDetail: yup
    .string()
    .required('상세주소를 입력해주세요')
    .max(100, '상세주소는 최대 100자 이내로 입력해주세요'),
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .max(100, '이메일 주소는 최대 100자 이내로 입력해주세요'),
  tel: yup
    .string()
    .required('휴대폰 번호를 입력해주세요')
    .min(12, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요')
    .max(13, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요'),
});

const Profile = () => {
  // 개인정보 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainOrders } = useSelector((state) => state.order);

  // 사업자 등록번호 입력(하이픈)
  const [corporateId, setCorporateId] = useState(user?.corporate_id);
  const onChangeCorporateId = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length < 4) {
      result = value;
    } else if (value.length < 6) {
      result = `${value.substr(0, 3)}-${value.substr(3)}`;
    } else if (value.length < 10) {
      result = `${value.substr(0, 3)}-${value.substr(3, 2)}-${value.substr(5)}`;
    } else {
      result = `${value.substr(0, 3)}-${value.substr(3, 2)}-${value.substr(
        5,
        5
      )}`;
    }
    setCorporateId(result);
  };

  // 휴대폰 번호 입력(하이픈)
  const [tel, setTel] = useState(user?.tel);
  const onChangeTel = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length < 4) {
      result = value;
    } else if (value.length < 7) {
      result = `${value.substr(0, 3)}-${value.substr(3)}`;
    } else if (value.length < 11) {
      result = `${value.substr(0, 3)}-${value.substr(3, 3)}-${value.substr(6)}`;
    } else {
      result = `${value.substr(0, 3)}-${value.substr(3, 4)}-${value.substr(
        7,
        4
      )}`;
    }
    setTel(result);
  };

  // 주소검색 모달
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);

  // 회원탈퇴 확인
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const cancelRef = useRef();

  // 개인정보 수정
  const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    console.log(data);
  };

  // 페이지 이동
  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileSchema) });

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
            {mainOrders.length ? (
              mainOrders.map((order) => (
                <OrderList key={order.id} order={order} />
              ))
            ) : (
              <Flex
                m="1rem"
                p="1.5rem"
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="base"
              >
                주문내역이 없습니다.
              </Flex>
            )}
          </TabPanel>
          <TabPanel>
            <Heading as="h1" size="md">
              개인정보 설정
            </Heading>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Table my="1rem" size="sm" borderTop="1px">
                <Tbody>
                  {/* 업체명 */}
                  <FormInput label="업체명" errors={errors.corporateName} table>
                    <Input
                      {...register('corporateName')}
                      placeholder="업체명"
                      defaultValue={user?.corporate_name}
                    />
                  </FormInput>

                  {/* 대표자명 */}
                  <FormInput label="대표자명" errors={errors.name} table>
                    <Input
                      {...register('name')}
                      placeholder="대표자명"
                      defaultValue={user?.name}
                    />
                  </FormInput>

                  {/* 사업자 등록번호 */}
                  <FormInput
                    label="사업자 등록번호"
                    errors={errors.corporateId}
                    table
                  >
                    <Input
                      {...register('corporateId')}
                      placeholder="123-45-67890"
                      value={corporateId}
                      onChange={onChangeCorporateId}
                    />
                  </FormInput>

                  {/* 주소 */}
                  <FormInput
                    label="주소"
                    errors={errors.zipCode}
                    nextErrors={errors.addressDetail}
                    table
                  >
                    <VStack spacing="0.5rem">
                      <InputGroup>
                        <Input
                          {...register('zipCode')}
                          placeholder="우편번호"
                          defaultValue={user?.zip_code}
                          isReadOnly
                        />
                        <InputRightElement w="7rem">
                          <Button
                            size="sm"
                            color="gray"
                            onClick={(e) => setShowPostCodeModal(true)}
                          >
                            우편번호 검색
                          </Button>
                          {showPostCodeModal && (
                            <Modal
                              width="450px"
                              height="550px"
                              padding="0.5rem"
                              setShowModal={setShowPostCodeModal}
                            >
                              <PostCode
                                height="500px"
                                setShowPostCodeModal={setShowPostCodeModal}
                                setValue={setValue}
                              />
                            </Modal>
                          )}
                        </InputRightElement>
                      </InputGroup>
                      <Input
                        {...register('address')}
                        placeholder="주소"
                        defaultValue={user?.address}
                        isReadOnly
                      />
                      <Input
                        {...register('addressDetail')}
                        placeholder="상세주소"
                        defaultValue={user?.address_detail}
                      />
                    </VStack>
                  </FormInput>

                  {/* 이메일 주소 */}
                  <FormInput label="이메일 주소" errors={errors.email} table>
                    <Input
                      {...register('email')}
                      placeholder="이메일 주소"
                      defaultValue={user?.email}
                    />
                  </FormInput>

                  {/* 휴대폰 번호 */}
                  <FormInput label="휴대폰 번호" errors={errors.tel} table>
                    <Input
                      {...register('tel')}
                      placeholder="010-1234-5678"
                      value={tel}
                      onChange={onChangeTel}
                    />
                  </FormInput>
                </Tbody>
              </Table>
              <Flex mt="2rem" justifyContent="space-between">
                <Button
                  w="150px"
                  size="md"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => setShowAlert(true)}
                >
                  회원탈퇴
                </Button>
                <AlertDialog
                  motionPreset="slideInBottom"
                  isOpen={showAlert}
                  leastDestructiveRef={cancelRef}
                  onClose={closeAlert}
                  blockScrollOnMount={false}
                  isCentered
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader m="0" fontSize="lg" fontWeight="bold">
                        회원탈퇴
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        회원탈퇴 이후 한 달간 재가입이 불가능합니다.
                        <br />
                        정말로 탈퇴하시겠습니까?
                        <Flex my="1.5rem" justifyContent="space-between">
                          <Button
                            w="100px"
                            size="sm"
                            colorScheme="blue"
                            ref={cancelRef}
                            onClick={closeAlert}
                          >
                            취소
                          </Button>
                          <Button
                            w="100px"
                            size="sm"
                            colorScheme="red"
                            onClick={closeAlert}
                          >
                            탈퇴
                          </Button>
                        </Flex>
                      </AlertDialogBody>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <Button type="submit" w="150px" size="md" colorScheme="blue">
                  수정하기
                </Button>
              </Flex>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
    context.store.dispatch(loadOrdersRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
