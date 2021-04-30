import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Box,
  Checkbox,
  Button,
  ButtonGroup,
  Icon,
  Flex,
  Text,
} from '@chakra-ui/react';
import { CgMathPlus, CgMathEqual } from 'react-icons/cg';
import AppLayout from '../components/AppLayout';
import CartList from '../components/CartList';

export default function cart() {
  // 전체 정보
  const [totalValue, setTotalValue] = useState({
    count: 0,
    amount: 0,
    shipping: 0,
    totalPrice: 0,
  });
  const { count, amount, shipping, totalPrice } = totalValue;
  const onChangeTotalValue = (e) => {
    // TODO
  };

  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainCarts } = useSelector((state) => state.cart);

  // 선택삭제 버튼
  const onClickCheckRemove = (e) => {
    // TODO 선택삭제
    console.log(mainCarts);
  };

  // 페이지 이동
  // useEffect(() => {
  //   if (!user) {
  //     Router.push('/signin');
  //   }
  // }, [user]);

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
      {mainCarts.length !== 0 ? (
        <>
          <Table variant="simple" borderTop="1px" borderColor="gray.400">
            <Thead>
              <Tr>
                <Th w="64px">
                  <Checkbox />
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
            {mainCarts.map((cart) => (
              <CartList key={cart?.item?.id} cart={cart} />
            ))}
          </Table>
          <Button
            m="1rem"
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={onClickCheckRemove}
          >
            선택삭제
          </Button>
        </>
      ) : (
        <Flex
          my="2rem"
          p="1.5rem"
          border="1px"
          borderRadius="lg"
          borderColor="gray.300"
          boxShadow="base"
        >
          장바구니가 비었습니다.
        </Flex>
      )}
      <Flex
        w="100%"
        my="1rem"
        p="1rem 1.5rem"
        justifyContent="flex-end"
        alignItems="center"
        border="1px"
        borderRadius="lg"
        borderColor="gray.300"
        boxShadow="base"
      >
        <Text mr="0.5rem">전체</Text>
        <Text fontWeight="bold" color="red.400">
          {count}
        </Text>
        <Text m="0 0.5rem 0 0.25rem">개의 상품금액</Text>
        <Text fontWeight="bold" color="red.400">
          {amount}
        </Text>
        <Text ml="0.25rem">원</Text>
        <Icon mx="0.5rem" as={CgMathPlus} boxSize="20px" color="gray" />
        <Text mr="0.5rem">배송비</Text>
        <Text fontWeight="bold" color="red.400">
          {shipping}
        </Text>
        <Text ml="0.25rem">원</Text>
        <Icon mx="0.5rem" as={CgMathEqual} boxSize="20px" color="gray" />
        <Text fontWeight="bold" color="red.400">
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
        {mainCarts.length !== 0 ? (
          <>
            <Button w="150px" variant="outline">
              선택구매
            </Button>
            <Button w="150px">전체구매</Button>
          </>
        ) : (
          <Button w="150px" disabled>
            전체구매
          </Button>
        )}
      </ButtonGroup>
    </AppLayout>
  );
}
