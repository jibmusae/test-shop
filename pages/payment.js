import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from '@redux-saga/core';
import {
  Image,
  Button,
  ButtonGroup,
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
import { loadOrdersRequestAction } from '../reducers/order';

const Payment = () => {
  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainOrders } = useSelector((state) => state.order);

  let orders = [];
  let itemsAmount = 0;
  let deliveryCharge = 0;
  let totalAmount = 0;

  mainOrders.map((order) => {
    if (Number(order.status) === 0) {
      itemsAmount += order.Item.price * order.count;
      deliveryCharge = itemsAmount >= 500000 ? 0 : 3000;
      totalAmount = itemsAmount + deliveryCharge;
      orders.push(order);
    }
  });

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
            {orders.length ? (
              orders.map((order) => (
                <Tbody key={order.order_id}>
                  <Tr>
                    <Td w="120px" textAlign="center">
                      <Image
                        boxSize="75px"
                        src={`http://localhost:3065/${order.Item.Image.src}`}
                        alt={order.Item.Image.alt}
                      />
                    </Td>
                    <Td>{order.Item.name}</Td>
                    <Td textAlign="center">{order.count}</Td>
                    <Td textAlign="center">
                      {order.amount.toLocaleString('ko-KR')}원
                    </Td>
                  </Tr>
                </Tbody>
              ))
            ) : (
              <Tbody>
                <Tr h="150px">
                  <Td colSpan="4" textAlign="center">
                    구매 상품이 없습니다.
                  </Td>
                </Tr>
              </Tbody>
            )}
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
                <Td>{itemsAmount.toLocaleString('ko-KR')}원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  배송비
                </Th>
                <Td>{deliveryCharge.toLocaleString('ko-KR')}원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  총 결제금액
                </Th>
                <Td>{totalAmount.toLocaleString('ko-KR')}원</Td>
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
            <Button
              w="150px"
              colorScheme="blue"
              onClick={onClickPayment}
              disabled={!orders.length}
            >
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
    context.store.dispatch(loadOrdersRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Payment;
