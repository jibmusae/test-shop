import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { END } from '@redux-saga/core';
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Checkbox,
  Button,
  ButtonGroup,
  Icon,
  Flex,
  Text,
  Td,
} from '@chakra-ui/react';
import { CgMathPlus, CgMathEqual } from 'react-icons/cg';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import CartList from '../components/CartList';
import { loadMyInfoRequest } from '../reducers/user';
import {
  allCheckRequestAction,
  loadMyCartRequestAction,
} from '../reducers/cart';
import {
  addOrderRequestAction,
  initializeSequenceRequestAction,
} from '../reducers/order';

const Cart = () => {
  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { myCart } = useSelector((state) => state.cart);

  // 페이지 이동
  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  // 초기값
  let totalCount = 0;
  let totalAmount = 0;
  let deliveryCharge = 0;
  let totalPrice = 0;
  let checkedCount = 0;
  let allChecked = false;

  if (myCart.length) {
    myCart.map((cart) => {
      if (cart.checked) {
        totalCount += Number(cart.count);
        totalAmount += Number(cart.Item.price) * Number(cart.count);
        checkedCount += 1;
      }
      if (totalAmount >= 500000 || !totalCount) {
        deliveryCharge = 0;
      } else {
        deliveryCharge = 3000;
      }
      totalPrice = totalAmount + deliveryCharge;
    });

    if (myCart.length === checkedCount) {
      allChecked = true;
    }
  }

  // 전체 체크
  const dispatch = useDispatch();
  const onChangeAllChecked = (e) => {
    dispatch(allCheckRequestAction({ checked: e.target.checked }));
  };

  // 선택구매 클릭
  const onClickPayment = () => {
    const data = [];
    if (myCart.length) {
      myCart.map((cart) => {
        if (cart.checked) {
          data.push({
            itemId: cart.Item.item_id,
            count: cart.count,
            price: cart.Item.price,
          });
        }
      });
    }
    console.log(data);
    dispatch(addOrderRequestAction(data));
    Router.push('/payment');
  };

  return (
    <AppLayout>
      <Heading
        as="h1"
        size="lg"
        fontFamily="noto"
        textAlign="center"
        mb="2rem"
        color="#212529" // GRAY 9
      >
        장바구니
      </Heading>

      <Table variant="simple" borderTop="1px" borderColor="gray.400">
        <Thead>
          <Tr>
            <Th w="64px">
              <Checkbox
                isDisabled={!myCart.length}
                onChange={onChangeAllChecked}
                isChecked={allChecked}
              />
            </Th>
            <Th w="123px"></Th>
            <Th textAlign="center">상품 정보</Th>
            <Th w="110px" textAlign="center">
              수량
            </Th>
            <Th w="148px" isNumeric>
              금액
            </Th>
            <Th w="64px" textAlign="center"></Th>
          </Tr>
        </Thead>
        {myCart.length ? (
          myCart.map((cart) => <CartList key={cart.cart_id} cart={cart} />)
        ) : (
          <Tbody>
            <Tr h="200px">
              <Td colSpan="6" textAlign="center">
                장바구니가 비었습니다.
              </Td>
            </Tr>
          </Tbody>
        )}
      </Table>

      <Flex
        my="2rem"
        p="1rem 1.5rem"
        justifyContent="flex-end"
        alignItems="center"
        border="1px"
        borderRadius="lg"
        borderColor="gray.300"
        boxShadow="base"
      >
        <Text mr="0.5rem">전체</Text>
        <Text fontWeight="bold" color="red">
          {totalCount.toLocaleString('ko-KR')}
        </Text>
        <Text ml="0.25rem" mr="0.5rem">
          개의 상품금액
        </Text>
        <Text fontWeight="bold" color="red">
          {totalAmount.toLocaleString('ko-KR')}
        </Text>
        <Text ml="0.25rem">원</Text>
        <Icon mx="0.25rem" boxSize="20px" as={CgMathPlus} />
        <Text mr="0.5rem">배송비</Text>
        <Text fontWeight="bold" color="red">
          {deliveryCharge.toLocaleString('ko-KR')}
        </Text>
        <Text ml="0.25rem">원</Text>
        <Icon mx="0.25rem" boxSize="20px" as={CgMathEqual} />
        <Text fontWeight="bold" color="red">
          {totalPrice.toLocaleString('ko-KR')}
        </Text>
        <Text ml="0.25rem">원</Text>
      </Flex>

      <ButtonGroup
        w="100%"
        d="flex"
        justifyContent="flex-end"
        colorScheme="blue"
        spacing="3"
      >
        <Button w="150px" onClick={onClickPayment} disabled={!myCart.length}>
          선택구매
        </Button>
      </ButtonGroup>
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
    context.store.dispatch(initializeSequenceRequestAction());
    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(loadMyCartRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Cart;
