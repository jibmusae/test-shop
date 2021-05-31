import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from '@redux-saga/core';
import axios from 'axios';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import wrapper from '../../store/configureStore';
import { loadMyInfoRequest } from '../../reducers/user';
import {
  loadInquireByIdRequest,
  removeInquireRequestAction,
  addAnswerRequestAction,
  updateAnswerRequestAction,
  removeAnswerRequestAction,
} from '../../reducers/inquire';

const inquireSchema = yup.object().shape({
  answer: yup.string().required('답변내용을 입력해주세요'),
});

const InquireView = () => {
  // 라우터
  const router = useRouter();

  // 상태관리
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { thisInquire, addAnswerDone, updateAnswerDone } = useSelector(
    (state) => state.inquire
  );

  // 초기값 설정
  let inquireId = '';
  let answerId = '';
  let createdAt = '';
  let answerStatus = '';
  let inquireTitle = '';
  let inquireContent = '';
  let answeredAt = '';
  let answerContent = '';
  let answerButtonName = '등록';

  if (thisInquire) {
    inquireId = thisInquire.inquire_id;
    answerId = thisInquire.Answer?.answer_id;
    createdAt = moment(thisInquire.createdAt).format('YYYY-MM-DD HH:mm');
    answerStatus = thisInquire.Answer ? '답변완료' : '미확인';
    inquireTitle = thisInquire.title;
    inquireContent = thisInquire.content;
    answeredAt = thisInquire.Answer
      ? moment(thisInquire.Answer.createdAt).format('YYYY-MM-DD HH:mm')
      : '';
    answerContent = thisInquire.Answer?.content;
    answerButtonName = '수정';
  }

  // 문의 삭제
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const closeDeleteAlert = () => setShowDeleteAlert(false);
  const cancelRef = useRef();
  const onClickDelete = () => {
    dispatch(removeInquireRequestAction(inquireId));
    setShowDeleteAlert(false);
    router.push('/inquire');
  };

  // 답변 등록 및 수정
  const onSubmitAnswer = (data) => {
    const answer = data.answer;
    if (thisInquire.Answer) {
      dispatch(updateAnswerRequestAction({ inquireId, answerId, answer }));
    } else {
      dispatch(addAnswerRequestAction({ inquireId, answer }));
    }
  };

  useEffect(() => {
    if (addAnswerDone || updateAnswerDone) {
      setValue('answer', '');
    }
  }, [addAnswerDone, updateAnswerDone]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(inquireSchema) });

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
            <Td>{createdAt}</Td>
            <Th w="200px" bgColor="gray.200">
              처리상태
            </Th>
            <Td w="200px">{answerStatus}</Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">타이틀</Th>
            <Td colSpan="3">{inquireTitle}</Td>
          </Tr>
          <Tr h="200px">
            <Th bgColor="gray.200">문의내용</Th>
            <Td colSpan="3">{inquireContent}</Td>
          </Tr>
        </Tbody>
      </Table>

      {thisInquire?.Answer && (
        <>
          <Heading as="h1" size="md" mb="1.5rem">
            답변내용
          </Heading>
          <Table size="sm" borderTop="1px">
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
          {user?.admin_flag && (
            <Flex mt="0.75rem" justifyContent="flex-start">
              <Button
                size="sm"
                w="150px"
                colorScheme="red"
                variant="outline"
                onClick={(e) => {
                  dispatch(removeAnswerRequestAction({ inquireId, answerId }));
                }}
              >
                삭제
              </Button>
            </Flex>
          )}
        </>
      )}

      {user?.admin_flag && (
        <form onSubmit={handleSubmit(onSubmitAnswer)}>
          <Box
            mt="2rem"
            p="1rem"
            border="1px"
            borderColor="gray.300"
            borderRadius="lg"
            boxShadow="sm"
          >
            <Textarea
              {...register('answer')}
              placeholder="문의내용에 대한 답변을 달아주세요."
              minH="150px"
              resize="none"
              borderColor="gray.200"
            />
            <Box pl={2} color="red" fontSize="0.85rem">
              {errors.answer?.message}
            </Box>
            <Flex mt="0.5rem" justifyContent="flex-end">
              <Button type="submit" size="sm" w="150px" colorScheme="blue">
                {answerButtonName}
              </Button>
            </Flex>
          </Box>
        </form>
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
          {user?.user_id === thisInquire?.user_id && (
            <>
              <Button
                type="submit"
                w="150px"
                size="md"
                colorScheme="red"
                isDisabled={thisInquire?.Answer}
                onClick={(e) => setShowDeleteAlert(true)}
              >
                삭제하기
              </Button>
              <AlertDialog
                motionPreset="slideInBottom"
                isOpen={showDeleteAlert}
                leastDestructiveRef={cancelRef}
                onClose={closeDeleteAlert}
                blockScrollOnMount={false}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader m="0" fontSize="lg" fontWeight="bold">
                      문의 삭제
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      정말로 삭제하시겠습니까?
                      <Flex my="1.5rem" justifyContent="space-between">
                        <Button
                          w="100px"
                          size="sm"
                          colorScheme="blue"
                          ref={cancelRef}
                          onClick={closeDeleteAlert}
                        >
                          취소
                        </Button>
                        <Button
                          w="100px"
                          size="sm"
                          colorScheme="red"
                          onClick={onClickDelete}
                        >
                          삭제
                        </Button>
                      </Flex>
                    </AlertDialogBody>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
              <Link
                href="/inquireModify/[id]"
                as={`/inquireModify/${inquireId}`}
              >
                <Button
                  type="submit"
                  w="150px"
                  size="md"
                  colorScheme="blue"
                  isDisabled={thisInquire?.Answer}
                >
                  수정하기
                </Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(loadInquireByIdRequest(context.params.id));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default InquireView;
