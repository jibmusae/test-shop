import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Stack,
  Flex,
  Checkbox,
  Button,
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import SignLayout from '../components/SignLayout';
import ModalButton from '../components/ModalButton';
import PostCodeButton from '../components/PostCodeButton';

// yup
const signupSchema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(6, '아이디는 최소 6문자, 최대 20문자로 입력해주세요')
    .max(20, '아이디는 최소 6문자, 최대 20문자로 입력해주세요'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8문자, 최대 16문자로 입력해주세요')
    .max(16, '비밀번호는 최소 8문자, 최대 16문자로 입력해주세요'),
  passwordConfirm: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
  corporateName: yup.string().required('업체명을 입력해주세요'),
  name: yup
    .string()
    .required('대표자명을 입력해주세요')
    .min(2, '대표자명은 최소 2문자로 입력해주세요'),
  corporateId: yup.string().required('사업자 등록번호를 입력해주세요'),
  zipCode: yup.string().required('우편번호를 입력해주세요'),
  address: yup.string().required('주소를 입력해주세요'),
  addressDetail: yup.string().required('상세주소를 입력해주세요'),
  email: yup.string().required('이메일 주소를 입력해주세요'),
  tel: yup.string().required('휴대폰 번호를 입력해주세요'),
  termsCheck: yup.boolean().oneOf([true], '전체 이용약관에 동의해주세요'),
});

export default function signup() {
  // 다음 우편검색
  const [zipCode, setZipCode] = useState('');
  const onChangeZipCode = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  const [address, setAddress] = useState('');
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const [isPostOpen, setIsPostOpen] = useState(false);
  const onClickDaumPost = () => {
    setIsPostOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // 비밀번호 보이기
  const [showPassword, setShowPassword] = useState([false, false]);
  const [checkedItems, setCheckedItems] = useState([false, false]);

  // 이용약관 전체선택
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // react-hook-form 유효성 검사
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

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
                type={showPassword[0] ? 'text' : 'password'}
                placeholder="패스워드"
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
          )}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.password?.message}
        </Box>

        {/* 비밀번호 확인 */}
        <Box my={2}>비밀번호 확인</Box>
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup>
              <Input
                {...field}
                type={showPassword[1] ? 'text' : 'password'}
                placeholder="패스워드 확인"
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
          )}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.passwordConfirm?.message}
        </Box>

        {/* 업체명 */}
        <Box my={2}>업체명</Box>
        <Controller
          name="corporateName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="업체명" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.corporateName?.message}
        </Box>

        {/* 대표자명 */}
        <Box my={2}>대표자명</Box>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="대표자명" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.name?.message}
        </Box>

        {/* 사업자 등록번호 */}
        <Box my={2}>사업자 등록번호</Box>
        <Controller
          name="corporateId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="사업자 등록번호" />
          )}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.corporateId?.message}
        </Box>

        {/* 주소 */}
        <Box my={2}>주소</Box>
        <Controller
          name="zipCode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup mb={1}>
              <Input
                {...field}
                placeholder="우편번호"
                value={zipCode}
                onChange={onChangeZipCode}
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
                    setZipCode={setZipCode}
                    setAddress={setAddress}
                  />
                )}
              </InputRightElement>
            </InputGroup>
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="주소"
              value={address}
              onChange={onChangeAddress}
              isReadOnly
            />
          )}
        />
        <Controller
          name="addressDetail"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="상세주소" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.zipCode?.message ||
            errors.address?.message ||
            errors.addressDetail?.message}
        </Box>

        {/* 이메일 */}
        <Box my={2}>이메일</Box>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="이메일" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.email?.message}
        </Box>

        {/* 휴대폰 번호 */}
        <Box my={2}>연락처</Box>
        <Controller
          name="tel"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} placeholder="연락처" />}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.tel?.message}
        </Box>

        {/* 이용약관 */}
        <Box my={2}>이용약관</Box>
        <Stack
          p={2}
          spacing={1}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Controller
            name="termsCheck"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => {
                  setCheckedItems([e.target.checked, e.target.checked]);
                }}
              >
                전체 동의
              </Checkbox>
            )}
          />
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
