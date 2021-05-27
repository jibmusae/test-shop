import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
import {
  addAnswerRequestAction,
  removeInquireRequestAction,
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
  const answerStatus = inquire?.Answer ? '답변완료' : '미확인';
  const answerButton = inquire?.Answer ? '답변수정' : '답변등록';
  const answeredAt = inquire?.Answer?.createdAt
    ? moment(inquire?.Answer.createdAt).format('YYYY-MM-DD HH:mm')
    : '';

  // 답변 내용(관리자)
  const answerContent = inquire?.Answer ? inquire?.Answer.content : '';
  const [answer, setAnswer] = useState(answerContent);
  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  // 답변 등록(관리자)
  const dispatch = useDispatch();
  const onClickAnswer = () => {
    const inquireId = inquire?.inquire_id;
    if (inquire.answer_status) {
      dispatch(updateAnswerRequestAction({ inquireId, answer }));
    } else {
      dispatch(addAnswerRequestAction({ inquireId, answer }));
    }
  };

  // 문의 삭제
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const closeDeleteAlert = () => setShowDeleteAlert(false);
  const cancelRef = useRef();
  const onClickDelete = () => {
    dispatch(removeInquireRequestAction(inquire.inquire_id));
    setShowDeleteAlert(false);
    router.push('/inquire');
  };

  // 문의 수정
  const onClickUpdate = () => {};

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

      {inquire?.Answer && (
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
                isDisabled={inquire?.Answer}
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
                href={{
                  pathname: '/inquireWrite',
                  query: { inquire_id: inquire?.inquire_id },
                }}
              >
                <Button
                  type="submit"
                  w="150px"
                  size="md"
                  colorScheme="blue"
                  isDisabled={inquire?.Answer}
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
}
