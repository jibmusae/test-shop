import React, { useState, useCallback, useEffect } from 'react';
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
  Stack,
  Flex,
  Checkbox,
  Button,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ChevronRightIcon } from '@chakra-ui/icons';
import SignLayout from '../components/SignLayout';
import Modal from '../components/Modal';
import PostCode from '../components/PostCode';
import { loginRequestAction, signupRequestAction } from '../reducers/user';

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
  zipCode: yup.string().required('우편번호를 검색해주세요'),
  address: yup.string().required('주소를 검색해주세요'),
  addressDetail: yup.string().required('상세주소를 입력해주세요'),
  email: yup.string().required('이메일 주소를 입력해주세요'),
  tel: yup.string().required('휴대폰 번호를 입력해주세요'),
  termsCheck: yup.boolean().oneOf([true], '전체 이용약관에 동의해주세요'),
});

// Input
const FormInput = ({ label, register, name, placeholder, errors }) => (
  <>
    <Box my={2}>{label}</Box>
    <Input
      {...register(name)}
      placeholder={placeholder ? placeholder : label}
    />
    <Box pl={2} color="red" fontSize="0.85rem">
      {errors?.message}
    </Box>
  </>
);

export default function signup() {
  // 사업자 등록번호 입력(하이픈)
  const [corporateId, setCorporateId] = useState('');
  const onChangeCorporateId = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length < 4) {
      result = value;
    } else if (value.length < 6) {
      result = `${value.substr(0, 3)}-${value.substr(3)}`;
    } else if (value.length < 10) {
      result = `${value.substr(0, 3)}-${value.substr(3, 2)}-${value.substr(5)}`;
    } else {
      result = `${value.substr(0, 3)}-${value.substr(3, 2)}-${value.substr(
        5,
        5
      )}`;
    }
    setCorporateId(result);
  };

  // 휴대폰 번호 입력(하이픈)
  const [tel, setTel] = useState('');
  const onChangeTel = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length < 4) {
      result = value;
    } else if (value.length < 7) {
      result = `${value.substr(0, 3)}-${value.substr(3)}`;
    } else if (value.length < 11) {
      result = `${value.substr(0, 3)}-${value.substr(3, 3)}-${value.substr(6)}`;
    } else {
      result = `${value.substr(0, 3)}-${value.substr(3, 4)}-${value.substr(
        7,
        4
      )}`;
    }
    setTel(result);
  };

  // 주소검색 모달
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);

  // 비밀번호 보이기
  const [showPassword, setShowPassword] = useState([false, false]);
  const [checkedItems, setCheckedItems] = useState([false, false]);

  // 이용약관 전체선택
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // 이용약관 모달
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // 회원가입 상태관리
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError } = useSelector(
    (state) => state.user
  );
  const onSubmitForm = (data) => {
    dispatch(signupRequestAction(data));
  };

  // 회원가입 완료 표시 및 페이지 이동
  useEffect(() => {
    if (signupDone) {
      alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');
      Router.push('/login');
    }
  }, [signupDone]);

  // 서버 에러 표시
  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
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
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {/* 아이디 */}
        <FormInput
          label="아이디"
          register={register}
          name="id"
          errors={errors.id}
        />

        {/* 비밀번호 */}
        <Box my={2}>비밀번호</Box>
        <InputGroup>
          <Input
            {...register('password')}
            type={showPassword[0] ? 'text' : 'password'}
            placeholder="비밀번호"
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

        {/* 비밀번호 확인 */}
        <Box my={2}>비밀번호 확인</Box>
        <InputGroup>
          <Input
            {...register('passwordConfirm')}
            type={showPassword[1] ? 'text' : 'password'}
            placeholder="비밀번호 확인"
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

        {/* 업체명 */}
        <FormInput
          label="업체명"
          register={register}
          name="corporateName"
          errors={errors.corporateName}
        />

        {/* 대표자명 */}
        <FormInput
          label="대표자명"
          register={register}
          name="name"
          errors={errors.name}
        />

        {/* 사업자 등록번호 */}
        <Box my={2}>사업자 등록번호</Box>
        <Input
          {...register('corporateId')}
          placeholder="123-45-67890"
          value={corporateId}
          onChange={onChangeCorporateId}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.corporateId?.message}
        </Box>

        {/* 주소 */}
        <Box my={2}>주소</Box>
        <VStack spacing="0.5rem">
          <InputGroup>
            <Input {...register('zipCode')} placeholder="우편번호" isReadOnly />
            <InputRightElement w="7rem">
              <Button
                size="sm"
                color="gray"
                onClick={(e) => setShowPostCodeModal(true)}
              >
                우편번호 검색
              </Button>
              {showPostCodeModal && (
                <Modal
                  width="450px"
                  height="550px"
                  padding="0.5rem"
                  setShowModal={setShowPostCodeModal}
                >
                  <PostCode
                    height="500px"
                    setShowPostCodeModal={setShowPostCodeModal}
                    setValue={setValue}
                  />
                </Modal>
              )}
            </InputRightElement>
          </InputGroup>
          <Input {...register('address')} placeholder="주소" isReadOnly />
          <Input {...register('addressDetail')} placeholder="상세주소" />
        </VStack>
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.test?.message || errors.addressDetail?.message}
        </Box>

        {/* 이메일 */}
        <FormInput
          label="이메일"
          register={register}
          name="email"
          errors={errors.email}
        />

        {/* 휴대폰 번호 */}
        <Box my={2}>휴대폰 번호</Box>
        <Input
          {...register('tel')}
          placeholder="010-1234-5678"
          value={tel}
          onChange={onChangeTel}
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
          <Checkbox
            {...register('termsCheck')}
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => {
              setCheckedItems([e.target.checked, e.target.checked]);
            }}
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
            <ChevronRightIcon
              boxSize={6}
              color="gray.500"
              cursor="pointer"
              onClick={(e) => setShowServiceModal(true)}
            />
            {showServiceModal && (
              <Modal
                width="450px"
                height="500px"
                padding="0.5rem 1.5rem"
                title="와이디커넥트샵 이용약관"
                setShowModal={setShowServiceModal}
              >
                테스트입니당
              </Modal>
            )}
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
            <ChevronRightIcon
              boxSize={6}
              color="gray.500"
              cursor="pointer"
              onClick={(e) => setShowPrivacyModal(true)}
            />
            {showPrivacyModal && (
              <Modal
                width="450px"
                height="500px"
                padding="0.5rem 1.5rem"
                title="개인정보 수집 및 이용 동의"
                setShowModal={setShowPrivacyModal}
              >
                테스트2입니당
              </Modal>
            )}
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
          isLoading={signupLoading}
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
