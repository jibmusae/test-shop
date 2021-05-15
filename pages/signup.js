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
  Stack,
  Flex,
  Checkbox,
  Button,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ChevronRightIcon } from '@chakra-ui/icons';
import SignLayout from '../components/SignLayout';
import Modal from '../components/Modal';
import PostCode from '../components/PostCode';
import FormInput from '../components/FormInput';
import { signupRequestAction } from '../reducers/user';

// yup
const signupSchema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(6, '아이디는 최소 6자, 최대 20자로 입력해주세요')
    .max(20, '아이디는 최소 6자, 최대 20자로 입력해주세요'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자, 최대 16자로 입력해주세요')
    .max(16, '비밀번호는 최소 8자, 최대 16자로 입력해주세요'),
  passwordConfirm: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
  corporateName: yup
    .string()
    .required('업체명을 입력해주세요')
    .max(100, '업체명은 최대 100자 이내로 입력해주세요'),
  name: yup
    .string()
    .required('대표자명을 입력해주세요')
    .min(2, '대표자명은 최소 2자, 최대 100자로 입력해주세요')
    .max(100, '대표자명은 최소 2자, 최대 100자로 입력해주세요'),
  corporateId: yup
    .string()
    .required('사업자 등록번호를 입력해주세요')
    .min(12, '사업자 등록번호는 하이픈 포함 12자로 입력해주세요')
    .max(12, '사업자 등록번호는 하이픈 포함 12자로 입력해주세요'),
  zipCode: yup
    .string()
    .required('우편번호를 검색해주세요')
    .min(5, '우편번호는 5자로 입력해주세요')
    .max(5, '우편번호는 5자로 입력해주세요'),
  addressDetail: yup
    .string()
    .required('상세주소를 입력해주세요')
    .max(100, '상세주소는 최대 100자 이내로 입력해주세요'),
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .max(100, '이메일 주소는 최대 100자 이내로 입력해주세요'),
  tel: yup
    .string()
    .required('휴대폰 번호를 입력해주세요')
    .min(12, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요')
    .max(13, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요'),
  termsCheck: yup.boolean().oneOf([true], '전체 이용약관에 동의해주세요'),
});

export default function signup() {
  // 회원가입 상태관리
  const { signupLoading, signupDone, signupError } = useSelector(
    (state) => state.user
  );

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

  // 회원가입
  const dispatch = useDispatch();
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
        <FormInput label="아이디" errors={errors.id}>
          <Input {...register('id')} placeholder="아이디" />
        </FormInput>

        {/* 비밀번호 */}
        <FormInput label="비밀번호" errors={errors.password}>
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
        </FormInput>

        {/* 비밀번호 확인 */}
        <FormInput label="비밀번호 확인" errors={errors.passwordConfirm}>
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
        </FormInput>

        {/* 업체명 */}
        <FormInput label="업체명" errors={errors.corporateName}>
          <Input {...register('corporateName')} placeholder="업체명" />
        </FormInput>

        {/* 대표자명 */}
        <FormInput label="대표자명" errors={errors.name}>
          <Input {...register('name')} placeholder="대표자명" />
        </FormInput>

        {/* 사업자 등록번호 */}
        <FormInput label="사업자 등록번호" errors={errors.corporateId}>
          <Input
            {...register('corporateId')}
            placeholder="123-45-67890"
            value={corporateId}
            onChange={onChangeCorporateId}
          />
        </FormInput>

        {/* 주소 */}
        <FormInput
          label="주소"
          errors={errors.zipCode}
          nextErrors={errors.addressDetail}
        >
          <VStack spacing="0.5rem">
            <InputGroup>
              <Input
                {...register('zipCode')}
                placeholder="우편번호"
                isReadOnly
              />
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
        </FormInput>

        {/* 이메일 주소 */}
        <FormInput label="이메일 주소" errors={errors.email}>
          <Input {...register('email')} placeholder="이메일 주소" />
        </FormInput>

        {/* 휴대폰 번호 */}
        <FormInput label="휴대폰 번호" errors={errors.tel}>
          <Input
            {...register('tel')}
            placeholder="010-1234-5678"
            value={tel}
            onChange={onChangeTel}
          />
        </FormInput>

        {/* 이용약관 */}
        <FormInput label="이용약관" errors={errors.termsCheck}>
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
        </FormInput>

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
