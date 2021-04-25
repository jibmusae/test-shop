import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Textarea,
  Flex,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AppLayout from '../components/AppLayout';

export default function InquireWrite() {
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [tel3, setTel3] = useState('');
  const onChangeTel = (e) => {
    console.log(e);
  };

  // maxLength
  const maxLengthCheck = (e) => {
    if (e.target.value.length > e.maxLength) {
      e.target.value = e.target.value.slice(0, e.maxLength);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Table my="2.5rem" size="sm" borderTop="1px">
          <Tbody>
            <Tr>
              <Th w="200px" bgColor="gray.200">
                이름
              </Th>
              <Td>
                <Input {...register('name')} name="name" size="sm" />
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">이메일</Th>
              <Td>
                <Input {...register('email')} size="sm" />
                {errors.email?.email}
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">연락처</Th>
              <Td>
                <Flex alignItems="center">
                  <Input
                    {...register('tel1')}
                    type="number"
                    w="6rem"
                    size="sm"
                    mr="0.5rem"
                    placeholder="010"
                    maxLength={3}
                    onInput={maxLengthCheck}
                  />
                  <Text fontSize="1.5rem">-</Text>
                  <Input
                    {...register('tel2')}
                    size="sm"
                    mx="0.25rem"
                    placeholder="1234"
                    maxLength={4}
                    onInput={maxLengthCheck}
                  />
                  <Text>-</Text>
                  <Input
                    {...register('tel3')}
                    size="sm"
                    ml="0.5rem"
                    placeholder="5678"
                    maxLength={4}
                    onInput={maxLengthCheck}
                  />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">타이틀</Th>
              <Td>
                <Input {...register('title')} size="sm" />
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">문의내용</Th>
              <Td>
                <Textarea
                  {...register('contents')}
                  size="sm"
                  minH="210px"
                  resize="none"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex mt="2rem" justifyContent="space-between">
          <Box>
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
          </Box>
          <Box>
            {/* TODO */}
            {/* 본인글일 경우 || 관리자일 경우 표시 */}
            <Button
              w="150px"
              mr="1rem"
              size="md"
              colorScheme="red"
              // onClick={onClickModify}
            >
              삭제
            </Button>
            {/* TODO */}
            {/* 본인글일 경우 '수정하기'로 교체표시 */}
            <Button type="submit" w="150px" size="md" colorScheme="blue">
              등록하기
            </Button>
          </Box>
        </Flex>
      </form>
    </AppLayout>
  );
}
