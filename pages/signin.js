import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SignLayout from "../components/SignLayout";

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
                type: currentError.type ?? "validation",
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

export default function signin({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = useMemo(() =>
    yup.object({
      email: yup
        .string()
        .email("이메일 주소 형식이 아닙니다")
        .required("이메일 주소를 입력해주세요"),
      password: yup
        .string()
        .min(8, "비밀번호는 최소 8문자, 최대 16문자로 입력해 주세요")
        .max(16, "비밀번호는 최소 8문자, 최대 16문자로 입력해 주세요")
        .required("비밀번호를 입력해주세요"),
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
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {/* 이메일 */}
        <InputGroup mt={3}>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.400" />}
          />
          <Input name="email" type="text" placeholder="이메일" ref={register} />
        </InputGroup>
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.email?.message}
        </Box>

        {/* 비밀번호 */}
        <InputGroup mt={3}>
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="gray.400" />}
          />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
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
