import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Box,
  Input,
  RadioGroup,
  Radio,
  Flex,
  Textarea,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useInput from '../hooks/useInput';

// yup
const addItemSchema = yup.object().shape({
  title: yup.string().required('상품명을 입력해주세요'),
  image: yup.string().required('상품이미지를 등록해주세요'),
  price: yup.number().required('금액을 입력해주세요'),
  startDate: yup.number().required('시작일을 입력해주세요'),
  endDate: yup.number().required('종료일을 입력해주세요'),
});

export default function AddItemForm(props) {
  // 모달
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 입력
  const [category, setCategory] = useState(1);
  const onChangeCategory = useCallback((value) => {
    setCategory(value);
  }, []);
  const [title, onChangeTitle] = useInput('');
  // TODO 상품 이미지
  // const [itemImage, setItemImage] = useState(null);
  // const onChangeImage = (e) => {
  //   setItemImage(e.target.files[0]);
  // };
  const [price, onChangePrice] = useInput(0);
  const [startDate, onChangeStartDate] = useInput(null);
  const [endDate, onChangeEndDate] = useInput(null);
  const [content, onChangeContent] = useInput('');

  // 상품 상태관리
  const dispatch = useDispatch();
  const { addItemLoading } = useSelector((state) => state.item);
  const onSubmitForm = useCallback(() => {
    console.log(category, title, image, price, startDate, endDate, content);
    dispatch(
      addItemRequestAction({
        category,
        title,
        image,
        price,
        startDate,
        endDate,
        content,
      })
    );
  }, []);

  // react-hook-form 유효성 검사
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addItemSchema) });

  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Add Item"
        fontSize="20px"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="0" p="1rem">
            상품 추가
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="1.5rem">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              {/* 카테고리 */}
              <Box my={2}>카테고리</Box>
              <RadioGroup
                {...register('category')}
                defaultValue="1"
                onChange={onChangeCategory}
              >
                <Flex justifyContent="space-around">
                  <Radio value="1">CPU</Radio>
                  <Radio value="2">메인보드</Radio>
                  <Radio value="3">그래픽카드</Radio>
                  <Radio value="4">그 외</Radio>
                </Flex>
              </RadioGroup>

              {/* 상품명 */}
              <Box my={2}>상품명</Box>
              <Input {...register('title')} placeholder="상품명" />

              {/* 상품 이미지 */}
              <Box my={2}>상품 이미지</Box>
              <Input
                type="file"
                {...register('image')}
                // onChange={onChangeImage}
              />

              {/* 금액 */}
              <Box my={2}>금액</Box>
              <InputGroup>
                <Input
                  {...register('price')}
                  type="number"
                  placeholder="0"
                  textAlign="end"
                />
                <InputRightElement
                  pr="0.5rem"
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="원"
                />
              </InputGroup>

              {/* 진행일시 */}
              <Flex>
                <Box mr={1}>
                  <Box my={2}>시작일</Box>
                  <Input
                    {...register('startDate')}
                    type="number"
                    placeholder="YYYYMMDD"
                  />
                </Box>
                <Box ml={1}>
                  <Box my={2}>종료일</Box>
                  <Input
                    {...register('endDate')}
                    type="number"
                    placeholder="YYYYMMDD"
                  />
                </Box>
              </Flex>

              {/* 상품 설명 */}
              <Box my={2}>상품 설명</Box>
              <Textarea
                {...register('content')}
                minH="150px"
                size="sm"
                resize="none"
              />

              {/* 상품 등록 버튼 */}
              <Flex mt={4} justifyContent="center">
                <Button
                  w="150px"
                  size="md"
                  colorScheme="blue"
                  isLoading={addItemLoading}
                >
                  등록하기
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
