import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import InquireList from '../components/InquireList';

export default function inquire() {
  // 상태관리
  const { mainInquire } = useSelector((state) => state.inquire);

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
        문의하기
      </Heading>
      <Table mb="1rem" size="sm" borderTop="1px" borderColor="gray.400">
        <Thead>
          <Tr>
            <Th w="60px" textAlign="center" bgColor="gray.200">
              번호
            </Th>
            <Th textAlign="center" bgColor="gray.200">
              제목
            </Th>
            <Th w="120px" textAlign="center" bgColor="gray.200">
              작성자
            </Th>
            <Th w="120px" textAlign="center" bgColor="gray.200">
              작성일
            </Th>
            <Th w="120px" textAlign="center" bgColor="gray.200">
              답변
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {mainInquire?.length ? (
            mainInquire.map((inquire) => (
              <InquireList key={inquire.id} inquire={inquire} />
            ))
          ) : (
            <Tr h="100px">
              <Td colSpan="5" textAlign="center">
                문의글이 없습니다.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Flex mt="2rem" justifyContent="flex-end">
        <Link href="/inquireWrite">
          <Button w="100px" size="sm" colorScheme="blue">
            글쓰기
          </Button>
        </Link>
      </Flex>
    </AppLayout>
  );
}
