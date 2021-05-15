import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
import SignLayout from '../components/SignLayout';
import FormInput from '../components/FormInput';
import { loginRequestAction } from '../reducers/user';

// yup
const loginSchema = yup.object().shape({
  id: yup.string().required('아이디를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export default function login() {
  // 로그인 상태관리
  const { loginLoading, user, loginError } = useSelector((state) => state.user);

  // 비밀번호 보이기
  const [showPassword, setShowPassword] = useState(false);

  // 로그인
  const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    // 로그인 리퀘스트
    dispatch(loginRequestAction(data));
  };

  // 로그인 성공시 화면 이동
  useEffect(() => {
    if (user) {
      Router.push('/');
    }
  }, [user]);

  // 로그인 실패시 에러 출력
  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

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
        <FormInput label="아이디" errors={errors.id}>
          <Input {...register('id')} placeholder="아이디" />
        </FormInput>

        {/* 비밀번호 */}
        <FormInput label="비밀번호" errors={errors.password}>
          <InputGroup>
            <Input
              {...register('password')}
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
        </FormInput>

        {/* 아이디 / 패스워드 찾기 */}
        <Link href="/findUser">
          <Box
            m="0.5rem 0"
            textAlign="right"
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
          isLoading={loginLoading}
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
