import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Tr,
} from '@chakra-ui/react';
import AppLayout from '../../components/AppLayout';

export default function inquireView() {
  // 동적 라우팅
  const router = useRouter();

  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainInquire } = useSelector((state) => state.inquire);
  const inquire = mainInquire.find((v) => v.id == router.query.id);

  // 답변 내용(관리자)
  const answerContent = inquire?.status === 1 ? inquire?.answer?.content : '';
  const [answer, setAnswer] = useState(answerContent);
  const onChangeAnswer = useCallback(
    (e) => {
      setAnswer(e.target.value);
    },
    [answer]
  );

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
        문의내용
      </Heading>
      <Table my="2.5rem" size="sm" borderTop="1px">
        <Tbody>
          <Tr>
            <Th w="200px" bgColor="gray.200">
              등록일
            </Th>
            <Td>{inquire.createDate}</Td>
            <Th w="200px" bgColor="gray.200">
              처리상태
            </Th>
            <Td w="200px">{inquire?.status === 1 ? '답변완료' : '미확인'}</Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">타이틀</Th>
            <Td colSpan="3">{inquire?.title}</Td>
          </Tr>
          <Tr h="200px">
            <Th bgColor="gray.200">문의내용</Th>
            <Td colSpan="3">{inquire?.content}</Td>
          </Tr>
        </Tbody>
      </Table>

      {inquire?.status === 1 && (
        <Table my="2.5rem" size="sm" borderTop="1px">
          <Tbody>
            <Tr>
              <Th w="200px" bgColor="gray.200">
                답변일시
              </Th>
              <Td>{inquire?.answer?.date}</Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">답변내용</Th>
              <Td>{inquire?.answer?.content}</Td>
            </Tr>
          </Tbody>
        </Table>
      )}

      {user?.isAdmin && (
        <>
          <Textarea
            placeholder="문의내용에 대한 답변을 달아주세요."
            minH="150px"
            resize="none"
            value={answer}
            onChange={onChangeAnswer}
          />
          <Flex justifyContent="flex-end">
            <Button size="sm" w="150px" colorScheme="blue">
              {inquire?.status === 1 ? '수정' : '등록'}
            </Button>
          </Flex>
        </>
      )}

      <Flex mt="2rem" justifyContent="space-between">
        <Link href="/inquire">
          <Button
            w="150px"
            mr="1rem"
            size="md"
            colorScheme="blue"
            variant="outline"
          >
            돌아가기
          </Button>
        </Link>
        <HStack spacing="1rem">
          {user?.id === inquire.user.id && (
            <>
              <Button
                type="submit"
                w="150px"
                size="md"
                colorScheme="red"
                isDisabled={inquire.status}
              >
                삭제하기
              </Button>
              <Button
                type="submit"
                w="150px"
                size="md"
                colorScheme="blue"
                isDisabled={inquire.status}
              >
                수정하기
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </AppLayout>
  );
}
