import Link from 'next/link';
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

export default function inquire() {
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
      {/* TODO */}
      {/* 자신의 글을 최상위로!! */}
      <Table mb="1rem" size="sm" borderTop="1px">
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
          <Tr>
            <Td textAlign="center">99999</Td>
            <Td>
              일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
            </Td>
            <Td textAlign="center">작성자</Td>
            <Td textAlign="center">2021-04-11</Td>
            <Td textAlign="center">미완료</Td>
          </Tr>
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
