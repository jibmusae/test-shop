import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector } from 'react-redux';
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
  Box,
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

  // 선택삭제 버튼
  const onClickCheckRemove = (e) => {
    // TODO 선택삭제
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

      <Button
        onClick={(e) => {
          console.log(user?.cart);
        }}
      >
        테스트
      </Button>

      <Table variant="simple" borderTop="1px" borderColor="gray.400">
        <Thead>
          <Tr>
            <Th w="64px">
              <Checkbox isDisabled={!user?.cart?.length} />
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
        {user?.cart?.length ? (
          user.cart.map((cart) => <CartList key={cart.itemId} cart={cart} />)
        ) : (
          <Tbody>
            <Tr h="100px">
              <Td colSpan="6" textAlign="center">
                장바구니가 비었습니다.
              </Td>
            </Tr>
          </Tbody>
        )}
      </Table>
      <Button
        m="1rem"
        size="sm"
        colorScheme="red"
        variant="outline"
        onClick={onClickCheckRemove}
        isDisabled={!user?.cart?.length}
      >
        선택삭제
      </Button>

      <Flex
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
        <Text fontWeight="bold" color="red">
          {count}
        </Text>
        <Text ml="0.25rem" mr="0.5rem">
          개의 상품금액
        </Text>
        <Text fontWeight="bold" color="red">
          {amount}
        </Text>
        <Text ml="0.25rem">원</Text>
        <Icon mx="0.25rem" boxSize="20px" as={CgMathPlus} />
        <Text mr="0.5rem">배송비</Text>
        <Text fontWeight="bold" color="red">
          {shipping}
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
        {user?.cart?.length ? (
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
