import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
  // 라우터
  const router = useRouter();

  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainInquire } = useSelector((state) => state.inquire);
  const inquire = mainInquire.find((v) => v.inquire_id == router.query.id);

  // 작성일시
  const createAt = moment(inquire?.createdAt).format('YYYY-MM-DD HH:mm');

  // 답변
  const answerStatus = inquire?.process_status ? '답변완료' : '미확인';
  const answerButton = inquire?.process_status ? '답변수정' : '답변등록';
  const answeredAt = inquire?.process_datetime
    ? moment(inquire?.process_datetime).format('YYYY-MM-DD HH:mm')
    : '';

  // 답변 내용(관리자)
  const answerContent = inquire?.process_status ? inquire?.answer_content : '';
  const [answer, setAnswer] = useState(answerContent);
  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  // 답변 등록(관리자)
  const dispatch = useDispatch();
  const onClickAnswer = () => {
    const inquireId = inquire?.inquire_id;
    if (inquire.process_status) {
      dispatch(updateAnswerRequestAction({ inquireId, answer }));
    } else {
      dispatch(addAnswerRequestAction({ inquireId, answer }));
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
              작성일시
            </Th>
            <Td>{createAt}</Td>
            <Th w="200px" bgColor="gray.200">
              처리상태
            </Th>
            <Td w="200px">{answerStatus}</Td>
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

      {inquire?.process_status && (
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
                <Td>{answeredAt}</Td>
              </Tr>
              <Tr h="200px">
                <Th bgColor="gray.200">답변내용</Th>
                <Td>{answerContent}</Td>
              </Tr>
            </Tbody>
          </Table>
        </>
      )}

      {user?.admin_flag && (
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
              {answerButton}
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
          {user?.user_id === inquire?.user_id && (
            <>
              <Button
                type="submit"
                w="150px"
                size="md"
                colorScheme="red"
                isDisabled={inquire?.process_status}
              >
                삭제하기
              </Button>
              <Button
                type="submit"
                w="150px"
                size="md"
                colorScheme="blue"
                isDisabled={inquire?.process_status}
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
