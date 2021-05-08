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
import useInput from '../hooks/useInput';
import { signupRequestAction } from '../reducers/user';

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
  corporateId1: yup.string().required('사업자 등록번호를 입력해주세요'),
  corporateId2: yup.string().required('사업자 등록번호를 입력해주세요'),
  corporateId3: yup.string().required('사업자 등록번호를 입력해주세요'),
  zipCode: yup.string().required('우편번호를 선택해주세요'),
  address: yup.string().required('주소를 선택해주세요'),
  addressDetail: yup.string().required('상세주소를 입력해주세요'),
  email: yup.string().required('이메일 주소를 입력해주세요'),
  tel1: yup.string().required('휴대폰 번호를 입력해주세요'),
  tel2: yup.string().required('휴대폰 번호를 입력해주세요'),
  tel3: yup.string().required('휴대폰 번호를 입력해주세요'),
  termsCheck: yup.boolean().oneOf([true], '전체 이용약관에 동의해주세요'),
});

export default function signup() {
  // Input
  const [inputs, onChangeInputs] = useInput({
    id: '',
    password: '',
    passwordConfirm: '',
    corporateName: '',
    name: '',
    corporateId1: '',
    corporateId2: '',
    corporateId3: '',
    addressDetail: '',
    email: '',
    tel1: '',
    tel2: '',
    tel3: '',
  });
  const {
    id,
    password,
    passwordConfirm,
    corporateName,
    name,
    corporateId1,
    corporateId2,
    corporateId3,
    addressDetail,
    email,
    tel1,
    tel2,
    tel3,
  } = inputs;

  // 주소검색 모달
  const [showPostCodeModal, setShowPostCodeModal] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const onChangeZipCode = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

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
  const onSubmitForm = useCallback(() => {
    const corporateId =
      String(corporateId1) + String(corporateId2) + String(corporateId3);
    const tel = String(tel1) + String(tel2) + String(tel3);

    dispatch(
      signupRequestAction({
        id,
        password,
        corporateName,
        name,
        corporateId,
        zipCode,
        address,
        addressDetail,
        email,
        tel,
      })
    );
  }, [
    id,
    password,
    corporateName,
    name,
    corporateId1,
    corporateId2,
    corporateId3,
    zipCode,
    address,
    addressDetail,
    email,
    tel1,
    tel2,
    tel3,
  ]);

  // 페이지 이동
  useEffect(() => {
    if (signupDone) {
      Router.push('/');
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
        <Box my={2}>아이디</Box>
        <Input
          {...register('id')}
          placeholder="아이디"
          value={id}
          onChange={onChangeInputs}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.id?.message}
        </Box>

        {/* 비밀번호 */}
        <Box my={2}>비밀번호</Box>
        <InputGroup>
          <Input
            {...register('password')}
            type={showPassword[0] ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={onChangeInputs}
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
            value={passwordConfirm}
            onChange={onChangeInputs}
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
        <Box my={2}>업체명</Box>
        <Input
          {...register('corporateName')}
          placeholder="업체명"
          value={corporateName}
          onChange={onChangeInputs}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.corporateName?.message}
        </Box>

        {/* 대표자명 */}
        <Box my={2}>대표자명</Box>
        <Input
          {...register('name')}
          placeholder="대표자명"
          value={name}
          onChange={onChangeInputs}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.name?.message}
        </Box>

        {/* 사업자 등록번호 */}
        <Box my={2}>사업자 등록번호</Box>
        <HStack spacing="0.5rem">
          <Input
            {...register('corporateId1')}
            w="61px"
            type="number"
            placeholder="123"
            value={corporateId1}
            onChange={onChangeInputs}
          />
          <Box>-</Box>
          <Input
            {...register('corporateId2')}
            w="52px"
            type="number"
            placeholder="45"
            value={corporateId2}
            onChange={onChangeInputs}
          />
          <Box>-</Box>
          <Input
            {...register('corporateId3')}
            w="79px"
            type="number"
            placeholder="67890"
            value={corporateId3}
            onChange={onChangeInputs}
          />
        </HStack>
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.corporateId1?.message ||
            errors.corporateId2?.message ||
            errors.corporateId3?.message}
        </Box>

        {/* 주소 */}
        <Box my={2}>주소</Box>
        <VStack spacing="0.5rem">
          <InputGroup>
            <Input
              {...register('zipCode')}
              type="number"
              placeholder="우편번호"
              value={zipCode}
              onChange={onChangeZipCode}
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
                    setZipCode={setZipCode}
                    setAddress={setAddress}
                  />
                </Modal>
              )}
            </InputRightElement>
          </InputGroup>
          <Input
            {...register('address')}
            placeholder="주소"
            value={address}
            onChange={onChangeAddress}
            isReadOnly
          />
          <Input
            {...register('addressDetail')}
            placeholder="상세주소"
            value={addressDetail}
            onChange={onChangeInputs}
          />
        </VStack>
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.zipCode?.message ||
            errors.address?.message ||
            errors.addressDetail?.message}
        </Box>

        {/* 이메일 */}
        <Box my={2}>이메일</Box>
        <Input
          {...register('email')}
          placeholder="이메일"
          value={email}
          onChange={onChangeInputs}
        />
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.email?.message}
        </Box>

        {/* 휴대폰 번호 */}
        <Box my={2}>휴대폰 번호</Box>
        <HStack spacing="0.5rem">
          <Input
            {...register('tel1')}
            w="61px"
            type="number"
            placeholder="010"
            value={tel1}
            onChange={onChangeInputs}
          />
          <Box>-</Box>
          <Input
            {...register('tel2')}
            w="70px"
            type="number"
            placeholder="1234"
            value={tel2}
            onChange={onChangeInputs}
          />
          <Box>-</Box>
          <Input
            {...register('tel3')}
            w="70px"
            type="number"
            placeholder="5678"
            value={tel3}
            onChange={onChangeInputs}
          />
        </HStack>
        <Box pl={2} color="red" fontSize="0.85rem">
          {errors.tel1?.message || errors.tel2?.message || errors.tel3?.message}
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
