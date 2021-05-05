import React, { useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  addCartRequestAction,
  updateCartRequestAction,
} from '../reducers/user';
import { removeItemRequestAction } from '../reducers/item';

export default function ItemList({ item }) {
  // 상태관리
  const { user } = useSelector((state) => state.user);

  // 진행일시
  const startDate = `${Number(item?.startDate?.substr(0, 4))}년 ${Number(
    item?.startDate?.substr(4, 2)
  )}월 ${Number(item?.startDate?.substr(6, 2))}일`;

  const endDate = `${Number(item?.endDate?.substr(0, 4))}년 ${Number(
    item?.endDate?.substr(4, 2)
  )}월 ${Number(item?.endDate?.substr(6, 2))}일`;

  // 개수
  const [count, setCount] = useState(1);
  const onChangeCount = (e) => {
    setCount(e);
  };

  // 금액
  const price = `${item?.price?.toLocaleString('ko-KR')}원`;

  // 장바구니 추가
  const dispatch = useDispatch();
  const onClickAddCart = (e) => {
    if (user) {
      // 현재 장바구니에 존재하는 상품
      const preexistingCartItem = user.cart?.find((v) => v.itemId === item.id);

      if (preexistingCartItem) {
        const itemId = item.id;
        const itemCount = Number(count) + Number(preexistingCartItem.itemCount);

        // 장바구니 수정
        dispatch(updateCartRequestAction({ itemId, itemCount }));
      } else {
        // 장바구니 추가
        dispatch(addCartRequestAction({ item, count }));
      }
    } else {
      Router.push('/signin');
    }
  };

  // 상품 삭제(관리자)
  const onClickRemoveCart = (e) => {
    dispatch(removeItemRequestAction(item.id));
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
        <Image boxSize="150px" src={item?.image?.src} alt={item?.image?.alt} />
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
            {item?.title}
          </Heading>
          <Text>{item?.content}</Text>
        </Box>
        <Flex
          w="120px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="md">{user ? `${price}` : '금액 : 회원공개'}</Text>
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
          <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
            구매하기
          </Button>
          {user?.isAdmin && (
            <Button
              w="100px"
              mt="0.5rem"
              size="sm"
              colorScheme="red"
              onClick={onClickRemoveCart}
            >
              삭제
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
