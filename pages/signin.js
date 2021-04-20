import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Button,
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { loginRequestAction } from '../reducers/user';
import SignLayout from '../components/SignLayout';

// yup
const signinSchema = yup.object().shape({
  id: yup.string().required('아이디를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export default function signin() {
  // 비밀번호 보이기
  const [showPassword, setShowPassword] = useState(false);

  // TODO useState -> redux-saga
  const [confirmLoading, setConfirmLoading] = useState(false);

  // TODO 로그인 스테이터스
  const { loginLoading, loginDone } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    console.log(data);
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      Router.push('/');
    }, 1000);
    // dispatch(loginRequestAction({ id, password }));
  };

  // useEffect(() => {
  //   console.log(loginLoading);
  // }, [loginLoading]);

  // react-hook-form 유효성 검사
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });

  return (
    <SignLayout>
      <Heading
        flex="1"
        as="h1"
        size="md"
        mb="2rem"
        fontFamily="noto"
        textAlign="center"
        color="#212529" // GRAY 9
      >
        로그인
      </Heading>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {/* 아이디 */}
        <Box my={2}>아이디</Box>
        <Controller
          name="id"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="아이디" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.id?.message}
        </Box>

        {/* 비밀번호 */}
        <Box my={2}>비밀번호</Box>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup>
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder="패스워드"
              />
              <InputRightElement
                children={
                  showPassword ? (
                    <ViewIcon color="gray.400" />
                  ) : (
                    <ViewOffIcon color="gray.400" />
                  )
                }
                onClick={(e) => {
                  setShowPassword(!showPassword);
                }}
                cursor="pointer"
              />
            </InputGroup>
          )}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.password?.message}
        </Box>

        {/* 아이디 / 패스워드 찾기 */}
        <Link href="/findUser">
          <Box
            m={1}
            textAlign="end"
            color="gray"
            fontSize="0.85rem"
            cursor="pointer"
          >
            아이디 / 비밀번호 찾기
          </Box>
        </Link>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          mt={3}
          mb={3}
          colorScheme="blue"
          size="md"
          isLoading={confirmLoading}
          isFullWidth
        >
          로그인
        </Button>
        <Divider />

        {/* 회원가입 화면 이동 버튼 */}
        <Link href="/signup">
          <Button
            mt={3}
            colorScheme="blue"
            size="md"
            variant="outline"
            isFullWidth
          >
            회원가입
          </Button>
        </Link>
      </form>
    </SignLayout>
  );
}
