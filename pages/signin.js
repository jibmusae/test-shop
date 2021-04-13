import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Button,
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import SignLayout from '../components/SignLayout';
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default function signin() {
  // Input
  const [inputs, onChangeInputs] = useInput({
    id: '',
    password: '',
  });
  const { id, password } = inputs;

  // 비밀번호 보이기
  const [showPassword, setShowPassword] = useState(false);

  // 로그인 스테이터스
  const { loginLoading, loginDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ id, password }));
    // TODO useEffect
    Router.push('/');
  }, [id, password]);

  // useEffect(() => {
  //   console.log(loginDone);
  //   if (loginDone) {
  //     Router.push("/");
  //   }
  // }, [loginDone]);

  // react-hook-form 유효성 검사
  const validationSchema = useMemo(() =>
    yup.object({
      id: yup
        .string()
        .min(6, '아이디는 최소 6문자, 최대 20문자로 입력해주세요')
        .max(20, '아이디는 최소 6문자, 최대 20문자로 입력해주세요')
        .required('아이디를 입력해주세요'),
      password: yup
        .string()
        .min(8, '비밀번호는 최소 8문자, 최대 16문자로 입력해 주세요')
        .max(16, '비밀번호는 최소 8문자, 최대 16문자로 입력해 주세요')
        .required('비밀번호를 입력해주세요'),
    })
  );
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, errors } = useForm({ resolver });

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
        <FormControl mb={3} isInvalid={errors.id}>
          <FormLabel mb={1}>아이디</FormLabel>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="아이디"
            onChange={onChangeInputs}
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.id?.message}
          </Box>
        </FormControl>

        {/* 비밀번호 */}
        <FormControl mb={3} isInvalid={errors.password}>
          <FormLabel mb={1}>비밀번호</FormLabel>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              onChange={onChangeInputs}
              ref={register}
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
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.password?.message}
          </Box>
        </FormControl>

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
