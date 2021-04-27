import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  VStack,
  Box,
  InputGroup,
  Input,
  Flex,
  Button,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import PostCode from '../components/PostCode';
import useInput from '../hooks/useInput';
import Modal from '../components/Modal';

const profileSchema = yup.object().shape({
  corporateName: yup.string().required('업체명을 입력해주세요'),
  name: yup.string().required('대표자명을 입력해주세요'),
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
});

export default function profile() {
  // 상태관리
  const { user } = useSelector((state) => state.user);

  // Input
  const [inputs, onChangeInputs] = useInput({
    corporateName: user?.corporateName,
    name: user?.name,
    corporateId1: user?.corporateId.substr(0, 3),
    corporateId2: user?.corporateId.substr(3, 2),
    corporateId3: user?.corporateId.substr(5, 5),
    addressDetail: user?.addressDetail,
    email: user?.email,
    tel1: user?.tel.substr(0, 3),
    tel2: user?.tel.substr(3, 4),
    tel3: user?.tel.substr(7, 4),
  });
  const {
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
  const [zipCode, setZipCode] = useState(user?.zipCode);
  const [address, setAddress] = useState(user?.address);
  const onChangeZipCode = useCallback((e) => {
    setZipCode(e.target.value);
  }, []);
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  // 페이지 이동
  useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileSchema) });

  return (
    <AppLayout>
      <Tabs isFitted variant="enclosed-colored">
        {/* Tab Title */}
        <TabList mb="1rem">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>주문조회</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>개인정보</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h1" size="md">
              주문조회
            </Heading>
          </TabPanel>
          <TabPanel>
            <Heading as="h1" size="md">
              개인정보 설정
            </Heading>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <Table my="1rem" size="sm" borderTop="1px">
                <Tbody>
                  <Tr>
                    <Th w="200px" bgColor="gray.200">
                      업체명
                    </Th>
                    <Td>
                      <Input
                        {...register('corporateName')}
                        size="sm"
                        placeholder="업체명"
                        value={corporateName}
                        onChange={onChangeInputs}
                      />
                      <Box pl={2} color="red" fontSize="0.85rem">
                        {errors.corporateName?.message}
                      </Box>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th w="200px" bgColor="gray.200">
                      대표자명
                    </Th>
                    <Td>
                      <Input
                        {...register('name')}
                        size="sm"
                        placeholder="대표자명"
                        value={name}
                        onChange={onChangeInputs}
                      />
                      <Box pl={2} color="red" fontSize="0.85rem">
                        {errors.name?.message}
                      </Box>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th w="200px" bgColor="gray.200">
                      사업자 등록번호
                    </Th>
                    <Td>
                      <HStack spacing="0.5rem">
                        <Input
                          {...register('corporateId1')}
                          size="sm"
                          w="50px"
                          type="number"
                          placeholder="123"
                          value={corporateId1}
                          onChange={onChangeInputs}
                        />
                        <Box>-</Box>
                        <Input
                          {...register('corporateId2')}
                          size="sm"
                          w="42px"
                          type="number"
                          placeholder="45"
                          value={corporateId2}
                          onChange={onChangeInputs}
                        />
                        <Box>-</Box>
                        <Input
                          {...register('corporateId3')}
                          size="sm"
                          w="66px"
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
                    </Td>
                  </Tr>
                  <Tr>
                    <Th w="200px" bgColor="gray.200">
                      주소
                    </Th>
                    <Td>
                      <VStack spacing="0.5rem">
                        <InputGroup>
                          <Input
                            {...register('zipCode')}
                            size="sm"
                            type="number"
                            placeholder="우편번호"
                            value={zipCode}
                            onChange={onChangeZipCode}
                            isReadOnly
                          />
                          <Button
                            size="sm"
                            w="120px"
                            ml="0.25rem"
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
                        </InputGroup>
                        <Input
                          {...register('address')}
                          size="sm"
                          placeholder="주소"
                          value={address}
                          onChange={onChangeAddress}
                          isReadOnly
                        />
                        <Input
                          {...register('addressDetail')}
                          size="sm"
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
                    </Td>
                  </Tr>
                  <Tr>
                    <Th w="200px" bgColor="gray.200">
                      이메일 주소
                    </Th>
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
                    <Th w="200px" bgColor="gray.200">
                      휴대폰 번호
                    </Th>
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
                </Tbody>
              </Table>
              <Flex mt="2rem" justifyContent="center">
                <Button type="submit" w="150px" size="md" colorScheme="blue">
                  수정하기
                </Button>
              </Flex>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
