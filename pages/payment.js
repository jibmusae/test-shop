import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from '@redux-saga/core';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import DonePaying from '../components/DonePaying';
import { loadMyInfoRequest } from '../reducers/user';

const Payment = () => {
  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { tempOrders } = useSelector((state) => state.order);
  console.log(tempOrders);
  // 페이지 이동
  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  // 결제완료
  const [isFinishOrder, setIsFinishOrder] = useState(false);
  const onClickPayment = () => {
    setIsFinishOrder(true);
  };

  return (
    <AppLayout>
      {isFinishOrder ? (
        <DonePaying />
      ) : (
        <>
          <Heading
            as="h1"
            size="lg"
            fontFamily="noto"
            textAlign="center"
            mb="2rem"
            color="#212529" // GRAY 9
          >
            결제
          </Heading>
          <Heading as="h1" size="md">
            배송지
          </Heading>
          <Table my="1rem" size="sm" borderTop="1px">
            <Tbody>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  업체명
                </Th>
                <Td>{user?.corporate_name}</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  대표자명
                </Th>
                <Td>{user?.name}</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  주소
                </Th>
                <Td>{`(${user?.zip_code}) ${user?.address} ${user?.address_detail}`}</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  연락처
                </Th>
                <Td>{user?.tel}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Heading mt="2rem" as="h1" size="md">
            결제상품
          </Heading>
          <Table
            my="1rem"
            size="sm"
            variant="simple"
            borderTop="1px"
            borderColor="gray.400"
          >
            <Thead>
              <Tr>
                <Th colSpan="2" textAlign="center">
                  상품 정보
                </Th>
                <Th w="150px" textAlign="center">
                  수량
                </Th>
                <Th w="150px" textAlign="center">
                  금액
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td w="120px" textAlign="center">
                  이미지
                </Td>
                <Td>GIGABYTE B550m 어쩌고저쩌고</Td>
                <Td textAlign="center">99</Td>
                <Td textAlign="center">99,999,999원</Td>
              </Tr>
              <Tr>
                <Td w="120px" textAlign="center">
                  이미지
                </Td>
                <Td>GIGABYTE B550m 어쩌고저쩌고</Td>
                <Td textAlign="center">99</Td>
                <Td textAlign="center">99,999,999원</Td>
              </Tr>
              <Tr>
                <Td w="120px" textAlign="center">
                  이미지
                </Td>
                <Td>GIGABYTE B550m 어쩌고저쩌고</Td>
                <Td textAlign="center">99</Td>
                <Td textAlign="center">99,999,999원</Td>
              </Tr>
            </Tbody>
          </Table>
          <Heading mt="2rem" as="h1" size="md">
            결제정보
          </Heading>
          <Table my="1rem" size="sm" borderTop="1px">
            <Tbody>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  전체 상품가격
                </Th>
                <Td>99,999,999원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  배송비
                </Th>
                <Td>2,500원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  총 결제금액
                </Th>
                <Td>99,999,999원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  결제수단
                </Th>
                <Td>
                  <RadioGroup defaultValue="3" size="sm">
                    <HStack>
                      <Radio mr="1rem" value="1">
                        무통장입금
                      </Radio>
                      <Radio mr="1rem" value="2">
                        계좌이체
                      </Radio>
                      <Radio value="3">신용카드</Radio>
                    </HStack>
                  </RadioGroup>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <ButtonGroup
            w="100%"
            mt="2rem"
            d="flex"
            justifyContent="space-between"
            spacing="3"
          >
            <Link href="/">
              <Button w="150px" colorScheme="red" variant="outline">
                결제취소
              </Button>
            </Link>
            <Button w="150px" colorScheme="blue" onClick={onClickPayment}>
              결제하기
            </Button>
          </ButtonGroup>
        </>
      )}
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Payment;
