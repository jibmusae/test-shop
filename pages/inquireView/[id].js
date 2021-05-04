import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
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
import {
  addAnswerRequestAction,
  updateAnswerRequestAction,
} from '../../reducers/inquire';

export default function inquireView() {
  // 동적 라우팅
  const router = useRouter();

  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainInquire } = useSelector((state) => state.inquire);
  const inquire = mainInquire.find((v) => v.id == router.query.id);

  // 작성 일시
  const today = new Date();
  const todayYear = String(today.getFullYear());
  let todayMonth = '';
  let todayDate = '';

  if (today.getMonth() + 1 >= 10) {
    todayMonth = String(today.getMonth() + 1);
  } else {
    todayMonth = '0' + String(today.getMonth() + 1);
  }
  if (today.getDate() >= 10) {
    todayDate = String(today.getDate());
  } else {
    todayDate = '0' + String(today.getDate());
  }
  const createDate = todayYear + todayMonth + todayDate;

  // 답변 내용(관리자)
  const inquireId = inquire?.id;
  const answerContent = inquire?.status === 1 ? inquire?.answer?.content : '';
  const [answer, setAnswer] = useState(answerContent);
  const onChangeAnswer = useCallback(
    (e) => {
      setAnswer(e.target.value);
    },
    [answer]
  );
  const dispatch = useDispatch();
  const onClickAnswer = () => {
    if (inquire?.status === 1) {
      dispatch(
        updateAnswerRequestAction({
          inquireId,
          createDate,
          answer,
        })
      );
    } else {
      dispatch(
        addAnswerRequestAction({
          inquireId,
          createDate,
          answer,
        })
      );
    }
  };

  return (
    <AppLayout>
      <Heading as="h1" size="md" mb="1.5rem">
        문의내용
      </Heading>
      <Table mb="2.5rem" size="sm" borderTop="1px">
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
        <>
          <Heading as="h1" size="md" mb="1.5rem">
            답변내용
          </Heading>
          <Table mb="2.5rem" size="sm" borderTop="1px">
            <Tbody>
              <Tr>
                <Th w="200px" bgColor="gray.200">
                  답변일시
                </Th>
                <Td>{inquire?.answer?.date}</Td>
              </Tr>
              <Tr h="200px">
                <Th bgColor="gray.200">답변내용</Th>
                <Td>{inquire?.answer?.content}</Td>
              </Tr>
            </Tbody>
          </Table>
        </>
      )}

      {user?.isAdmin && (
        <Box
          p="1rem"
          border="1px"
          borderColor="gray.300"
          borderRadius="lg"
          boxShadow="sm"
        >
          <Textarea
            placeholder="문의내용에 대한 답변을 달아주세요."
            minH="150px"
            resize="none"
            value={answer}
            onChange={onChangeAnswer}
            borderColor="gray.200"
          />
          <Flex mt="0.5rem" justifyContent="flex-end">
            <Button
              size="sm"
              w="150px"
              colorScheme="blue"
              onClick={onClickAnswer}
            >
              {inquire?.status === 1 ? '수정' : '등록'}
            </Button>
          </Flex>
        </Box>
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
