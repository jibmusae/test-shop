import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  HStack,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { addInquireRequestAction } from '../reducers/inquire';

const inquireSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요'),
  email: yup.string().required('이메일 주소를 입력해주세요'),
  tel1: yup.string().required('휴대폰 번호를 입력해주세요'),
  tel2: yup.string().required('휴대폰 번호를 입력해주세요'),
  tel3: yup.string().required('휴대폰 번호를 입력해주세요'),
  title: yup.string().required('타이틀을 입력해주세요'),
  contents: yup.string().required('문의내용을 입력해주세요'),
});

export default function InquireWrite() {
  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { addInquireDone } = useSelector((state) => state.inquire);

  // Input
  const [inputs, onChangeInputs] = useInput({
    name: user ? user.name : '',
    email: user ? user.email : '',
    tel1: user ? user.tel.substr(0, 3) : '',
    tel2: user ? user.tel.substr(3, 4) : '',
    tel3: user ? user.tel.substr(7, 4) : '',
    title: '',
    contents: '',
  });
  const { name, email, tel1, tel2, tel3, title, contents } = inputs;

  // 문의 작성
  const dispatch = useDispatch();
  const onSubmitForm = useCallback(() => {
    // 휴대폰 번호
    const tel = tel1 + tel2 + tel3;

    // 작성 날짜
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

    console.log(addInquireDone);

    dispatch(
      addInquireRequestAction({
        title,
        name,
        email,
        tel,
        contents,
        createDate,
      })
    );

    console.log(addInquireDone);

    // 페이지 이동
    if (addInquireDone) {
      Router.push('/inquire');
    }
  }, [name, email, tel1, tel2, tel3, title, contents]);

  // 페이지 이동
  // useEffect(() => {
  //   if (addInquireDone) {
  //     Router.push('/inquire');
  //   }
  // }, [addInquireDone]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(inquireSchema) });

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
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Table my="2.5rem" size="sm" borderTop="1px">
          <Tbody>
            <Tr>
              <Th w="200px" bgColor="gray.200">
                이름
              </Th>
              <Td>
                <Input
                  {...register('name')}
                  size="sm"
                  placeholder="이름"
                  value={name}
                  onChange={onChangeInputs}
                />
                <Box pl={2} color="red" fontSize="0.85rem">
                  {errors.name?.message}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">이메일 주소</Th>
              <Td>
                <Input
                  {...register('email')}
                  size="sm"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={onChangeInputs}
                />
                <Box pl={2} color="red" fontSize="0.85rem">
                  {errors.email?.message}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">휴대폰 번호</Th>
              <Td>
                <HStack spacing="0.5rem">
                  <Input
                    {...register('tel1')}
                    size="sm"
                    w="50px"
                    type="number"
                    placeholder="010"
                    value={tel1}
                    onChange={onChangeInputs}
                  />
                  <Box>-</Box>
                  <Input
                    {...register('tel2')}
                    size="sm"
                    w="58px"
                    type="number"
                    placeholder="1234"
                    value={tel2}
                    onChange={onChangeInputs}
                  />
                  <Box>-</Box>
                  <Input
                    {...register('tel3')}
                    size="sm"
                    w="58px"
                    type="number"
                    placeholder="5678"
                    value={tel3}
                    onChange={onChangeInputs}
                  />
                </HStack>
                <Box pl={2} color="red" fontSize="0.85rem">
                  {errors.tel1?.message ||
                    errors.tel2?.message ||
                    errors.tel3?.message}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">타이틀</Th>
              <Td>
                <Input
                  {...register('title')}
                  size="sm"
                  placeholder="타이틀"
                  value={title}
                  onChange={onChangeInputs}
                />
                <Box pl={2} color="red" fontSize="0.85rem">
                  {errors.title?.message}
                </Box>
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
                  value={contents}
                  onChange={onChangeInputs}
                />
                <Box pl={2} color="red" fontSize="0.85rem">
                  {errors.contents?.message}
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
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
          <Button type="submit" w="150px" size="md" colorScheme="blue">
            등록하기
          </Button>
        </Flex>
      </form>
    </AppLayout>
  );
}
