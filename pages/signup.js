import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Stack,
  Flex,
  Checkbox,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SignLayout from "../components/SignLayout";
import ModalButton from "../components/ModalButton";
import PostCodeButton from "../components/PostCodeButton";

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

export default function signup() {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const onClickDaumPost = () => {
    setIsPostOpen(true);
    document.body.style.overflow = "hidden";
  };

  const [zipCode, setZipCode] = useState("");
  const onChangeZipCode = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  const getZipCode = (value) => {
    setZipCode(value);
  };

  const [address, setAddress] = useState("");
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);
  const getAddress = (value) => {
    setAddress(value);
  };

  const [showPassword, setShowPassword] = useState([false, false]);
  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const validationSchema = useMemo(() =>
    yup.object({
      id: yup
        .string()
        .min(6, "아이디는 최소 6문자, 최대 20문자로 입력해주세요")
        .max(20, "아이디는 최소 6문자, 최대 20문자로 입력해주세요")
        .required("아이디를 입력해주세요"),
      password: yup
        .string()
        .min(8, "비밀번호는 최소 8문자, 최대 16문자로 입력해주세요")
        .max(16, "비밀번호는 최소 8문자, 최대 16문자로 입력해주세요")
        .required("비밀번호를 입력해주세요"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
        .required("비밀번호를 입력해주세요"),
      corporateName: yup.string().required("업체명을 입력해주세요"),
      name: yup
        .string()
        .min(2, "대표자명은 최소 2문자로 입력해주세요")
        .required("대표자명을 입력해주세요"),
      corporateId: yup.string().required("사업자 등록번호를 입력해주세요"),
      zipCode: yup.string().required("우편번호를 입력해주세요"),
      address: yup.string().required("주소를 입력해주세요"),
      addressDetail: yup.string().required("상세주소를 입력해주세요"),
      email: yup
        .string()
        .email("이메일 주소 형식이 아닙니다")
        .required("이메일 주소를 입력해주세요"),
      tel: yup.string().required("휴대폰 번호를 입력해주세요"),
      termsCheck: yup.boolean().oneOf([true], "전체 이용약관에 동의해주세요"),
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
        회원가입
      </Heading>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {/* 아이디 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>아이디</FormLabel>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="아이디"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.id?.message}
          </Box>
        </FormControl>

        {/* 비밀번호 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>비밀번호</FormLabel>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={showPassword[0] ? "text" : "password"}
              placeholder="비밀번호"
              ref={register}
            />
            <InputRightElement
              children={
                showPassword[0] ? (
                  <ViewIcon color="gray.400" />
                ) : (
                  <ViewOffIcon color="gray.400" />
                )
              }
              onClick={(e) => {
                setShowPassword([!showPassword[0], showPassword[1]]);
              }}
              cursor="pointer"
            />
          </InputGroup>
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.password?.message}
          </Box>
        </FormControl>

        {/* 비밀번호 확인 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>비밀번호 확인</FormLabel>
          <InputGroup>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type={showPassword[1] ? "text" : "password"}
              placeholder="비밀번호 확인"
              ref={register}
            />
            <InputRightElement
              children={
                showPassword[1] ? (
                  <ViewIcon color="gray.400" />
                ) : (
                  <ViewOffIcon color="gray.400" />
                )
              }
              onClick={(e) => {
                setShowPassword([showPassword[0], !showPassword[1]]);
              }}
              cursor="pointer"
            />
          </InputGroup>
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.passwordConfirm?.message}
          </Box>
        </FormControl>

        {/* 업체명 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>업체명</FormLabel>
          <Input
            id="corporateName"
            name="corporateName"
            type="text"
            placeholder="업체명"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.corporateName?.message}
          </Box>
        </FormControl>

        {/* 대표자명 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>대표자명</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="대표자명"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.name?.message}
          </Box>
        </FormControl>

        {/* 사업자 등록번호 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>사업자 등록번호</FormLabel>
          <Input
            id="corporateId"
            name="corporateId"
            type="text"
            placeholder="사업자 등록번호(숫자만)"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.corporateId?.message}
          </Box>
        </FormControl>

        {/* 주소 */}
        <FormControl>
          <FormLabel mb={1}>주소</FormLabel>
          <InputGroup mb={1}>
            <Input
              id="zipCode"
              name="zipCode"
              type="text"
              placeholder="우편번호"
              value={zipCode}
              onChange={onChangeZipCode}
              ref={register}
              isReadOnly
            />
            <InputRightElement w="7rem">
              <Button size="sm" color="gray" onClick={onClickDaumPost}>
                우편번호 검색
              </Button>
              {isPostOpen && (
                <PostCodeButton
                  setIsPostOpen={setIsPostOpen}
                  isPostOpen={isPostOpen}
                  getZipCode={getZipCode}
                  getAddress={getAddress}
                />
              )}
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <Input
            mb={1}
            id="address"
            name="address"
            type="text"
            placeholder="주소"
            value={address}
            onChange={onChangeAddress}
            ref={register}
            isReadOnly
          />
        </FormControl>
        <FormControl mb={3}>
          <Input
            id="addressDetail"
            name="addressDetail"
            type="text"
            placeholder="상세주소"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.zipCode?.message ||
              errors.address?.message ||
              errors.addressDetail?.message}
          </Box>
        </FormControl>

        {/* 이메일 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>이메일</FormLabel>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="이메일"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.email?.message}
          </Box>
        </FormControl>

        {/* 휴대폰 번호 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>휴대폰 번호</FormLabel>
          <Input
            id="tel"
            name="tel"
            type="text"
            placeholder="휴대폰 번호"
            ref={register}
          />
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.tel?.message}
          </Box>
        </FormControl>

        {/* 이용약관 */}
        <FormControl mb={3}>
          <FormLabel mb={1}>이용약관</FormLabel>
          <Stack
            p={2}
            spacing={1}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Checkbox
              id="termsCheck"
              name="termsCheck"
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) => {
                setCheckedItems([e.target.checked, e.target.checked]);
              }}
              ref={register}
            >
              전체 동의
            </Checkbox>
            <Flex justify="space-between" align="center">
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e) => {
                  setCheckedItems([e.target.checked, checkedItems[1]]);
                }}
              >
                와이디커넥트샵 이용약관 동의
              </Checkbox>
              <ModalButton title="와이디커넥트샵 이용약관" content="테스트1" />
            </Flex>
            <Flex justify="space-between" align="center">
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={(e) => {
                  setCheckedItems([checkedItems[0], e.target.checked]);
                }}
              >
                개인정보 수집 및 이용 동의
              </Checkbox>
              <ModalButton title="개인정보 수집 및 이용" content="테스트2" />
            </Flex>
          </Stack>
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors.termsCheck?.message}
          </Box>
        </FormControl>

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          mt={5}
          mb={3}
          colorScheme="blue"
          size="md"
          isFullWidth
        >
          회원가입
        </Button>
        <Divider />

        {/* 로그인 화면 이동 버튼 */}
        <Link href="/signin">
          <Button
            mt={3}
            colorScheme="blue"
            size="md"
            variant="outline"
            isFullWidth
          >
            로그인
          </Button>
        </Link>
      </form>
    </SignLayout>
  );
}
