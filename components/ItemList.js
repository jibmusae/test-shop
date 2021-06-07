import React, { useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Text,
  Flex,
  Image,
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from '@chakra-ui/react';
import { removeItemRequestAction } from '../reducers/item';
import { addCartRequestAction } from '../reducers/cart';
import { addOrderRequestAction } from '../reducers/order';

export default function ItemList({ item }) {
  // 상태관리
  const { user } = useSelector((state) => state.user);

  // 상품
  const itemId = item.item_id;
  const startDate = moment(item.start_datetime).format('YYYY-MM-DD');
  const endDate = moment(item.end_datetime).format('YYYY-MM-DD');
  const [count, setCount] = useState(1);
  const onChangeCount = (e) => {
    setCount(Number(e));
  };

  // 장바구니 추가
  const dispatch = useDispatch();
  const onClickAddCart = () => {
    if (user) {
      dispatch(addCartRequestAction({ itemId, count }));
      alert('장바구니에 담았습니다.');
    } else {
      Router.push('/login');
    }
  };

  // 상품 구매하기
  const onClickPayment = () => {
    if (user) {
      const data = [];
      data.push({ itemId: itemId, count: count, price: item.price });
      dispatch(addOrderRequestAction(data));
      Router.push('/payment');
    } else {
      Router.push('/login');
    }
  };

  // 상품 삭제(관리자)
  const onClickRemoveItem = () => {
    dispatch(removeItemRequestAction(itemId));
  };

  return (
    <>
      <Text ml="16px">
        진행일 : {startDate} ~ {endDate}
      </Text>
      <Flex
        h="220px"
        m="1rem"
        p="1.5rem"
        border="1px"
        borderRadius="lg"
        borderColor="gray.300"
        boxShadow="base"
        alignItems="center"
      >
        <Image
          boxSize="150px"
          src={`http://localhost:3065/${item.Image.src}`}
          alt={`http://localhost:3065/${item.Image.alt}`}
        />
        <Box w="476px" mx="2rem">
          <Heading
            as="h2"
            size="sm"
            fontFamily="noto"
            mb="0.5rem"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {item.name}
          </Heading>
          <Text>{item.description}</Text>
        </Box>
        <Flex
          w="120px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="md">
            {user
              ? `${item.price.toLocaleString('ko-KR')}원`
              : '금액 : 회원공개'}
          </Text>
          <NumberInput
            w="100px"
            mt="0.5rem"
            size="sm"
            min={1}
            max={99}
            value={count}
            onChange={onChangeCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            w="100px"
            mt="0.5rem"
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={onClickAddCart}
          >
            장바구니
          </Button>
          <Button
            w="100px"
            mt="0.5rem"
            size="sm"
            colorScheme="blue"
            onClick={onClickPayment}
          >
            구매하기
          </Button>
          {user?.admin_flag && (
            <Button
              w="100px"
              mt="0.5rem"
              size="sm"
              colorScheme="red"
              onClick={onClickRemoveItem}
            >
              삭제
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
