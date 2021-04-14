import Link from 'next/link';
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';

export default function payment() {
  const [isFinishOrder, setIsFinishOrder] = useState(false);
  const onClickPayment = () => {
    setIsFinishOrder(true);
  };

  return (
    <AppLayout>
      {isFinishOrder ? (
        <>
          <Heading
            as="h1"
            size="lg"
            fontFamily="noto"
            textAlign="center"
            mb="2rem"
            color="#212529" // GRAY 9
          >
            결제완료
          </Heading>
          <Box>
            <Heading mt="2rem" mb="1rem" as="h1" size="md" textAlign="center">
              주문이 완료되었습니다.
            </Heading>
            <Flex justifyContent="center">
              <Text mr="1rem">주문일 : 2021/04/14</Text>
              <Text>주문번호 : 1320210414001</Text>
            </Flex>
          </Box>
          <Link href="/">
            <Flex mt="3rem" justifyContent="center">
              <Button w="180px" size="md" colorScheme="blue">
                돌아가기
              </Button>
            </Flex>
          </Link>
        </>
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
                <Td>와이디커넥트</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  대표자명
                </Th>
                <Td>윤재원</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  주소
                </Th>
                <Td>부산광역시 영도구 와치로213 상가 1층 105호</Td>
              </Tr>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  연락처
                </Th>
                <Td>010-6888-8444</Td>
              </Tr>
            </Tbody>
          </Table>
          <Heading mt="2rem" as="h1" size="md">
            결제상품
          </Heading>
          <Table my="1rem" size="sm" borderTop="1px">
            <Thead>
              <Tr>
                <Th textAlign="center" bgColor="gray.200" colSpan="2">
                  상품
                </Th>
                <Th w="75px" textAlign="center" bgColor="gray.200">
                  개수
                </Th>
                <Th w="150px" textAlign="center" bgColor="gray.200">
                  가격
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
          <Flex mt="3rem" justifyContent="center">
            <Button
              w="180px"
              size="md"
              colorScheme="blue"
              onClick={onClickPayment}
            >
              결제하기
            </Button>
          </Flex>
        </>
      )}
    </AppLayout>
  );
}
