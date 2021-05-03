import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  ModalFooter,
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
import { addItemRequestAction } from '../reducers/item';

// yup
const addItemSchema = yup.object().shape({
  title: yup.string().required('상품명을 입력해주세요'),
  imageName: yup.string().required('상품이미지를 선택해주세요'),
  price: yup.string().required('금액을 입력해주세요'),
  startDate: yup.string().required('시작일을 입력해주세요'),
  endDate: yup.string().required('종료일을 입력해주세요'),
  content: yup.string().required('상품설명을 입력해주세요'),
});

export default function AddItemForm() {
  // 모달
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 입력
  const [inputs, setInputs] = useState({
    title: '',
    price: '',
    startDate: '',
    endDate: '',
    content: '',
  });
  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // 입력(카테고리)
  const [category, setCategory] = useState(1);

  // 입력(이미지)
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const onChangeImage = useCallback((e) => {
    if (e.target.value !== '') {
      const imageNameSplit = e.target.files[0]?.name.split('.');

      setImage(e.target.value);
      setImageName(e.target.files[0]?.name);
      setImageAlt(e.target.files[0] && imageNameSplit[0]);
    }
  }, []);

  // 이미지 선택
  const fileRef = useRef();
  const onClickImageUpload = (e) => {
    fileRef.current.click();
  };

  // 입력 값
  const { title, price, startDate, endDate, content } = inputs;

  // 상품 상태관리
  const dispatch = useDispatch();
  const { addItemLoading, addItemDone } = useSelector((state) => state.item);
  const onSubmitForm = () => {
    dispatch(
      addItemRequestAction({
        category,
        title,
        image,
        imageAlt,
        price,
        startDate,
        endDate,
        content,
      })
    );
    if (addItemDone) {
      onClose();
    }
  };

  // form 초기화
  useEffect(() => {
    if (addItemDone) {
      setInputs({
        title: '',
        price: '',
        startDate: '',
        endDate: '',
        content: '',
      });
      setCategory(1);
      setImage('');
      setImageName('');
      setImageAlt('');

      onClose();
    }
  }, [addItemDone]);

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
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <ModalBody p="1.5rem">
              {/* 카테고리 */}
              <Box my={2}>카테고리</Box>
              <RadioGroup
                {...register('category')}
                onChange={setCategory}
                value={category}
              >
                <Flex justifyContent="space-around">
                  <Radio value={1}>CPU</Radio>
                  <Radio value={2}>메인보드</Radio>
                  <Radio value={3}>그래픽카드</Radio>
                  <Radio value={4}>그 외</Radio>
                </Flex>
              </RadioGroup>
              <Box pl={2} color="red" fontSize="0.85rem">
                {errors.category?.message}
              </Box>

              {/* 상품명 */}
              <Box my={2}>상품명</Box>
              <Input
                {...register('title')}
                onChange={onChangeInputs}
                placeholder="상품명"
                value={title}
              />
              <Box pl={2} color="red" fontSize="0.85rem">
                {errors.title?.message}
              </Box>

              {/* 상품 이미지 */}
              <Box my={2}>상품 이미지</Box>
              <Input
                type="file"
                ref={fileRef}
                onChange={onChangeImage}
                value={image}
                d="none"
              />
              <InputGroup>
                <Input
                  {...register('imageName')}
                  placeholder="이미지 선택"
                  value={imageName}
                  readOnly
                />
                <InputRightElement width="100px">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={onClickImageUpload}
                  >
                    이미지 선택
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box pl={2} color="red" fontSize="0.85rem">
                {errors.image?.message}
              </Box>

              {/* 금액 */}
              <Box my={2}>금액</Box>
              <InputGroup>
                <Input
                  {...register('price')}
                  type="number"
                  placeholder="0"
                  textAlign="end"
                  onChange={onChangeInputs}
                  value={price}
                />
                <InputRightElement
                  pr="0.5rem"
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="원"
                />
              </InputGroup>
              <Box pl={2} color="red" fontSize="0.85rem">
                {errors.price?.message}
              </Box>

              {/* 진행일시 */}
              <Flex>
                <Box mr={1}>
                  <Box my={2}>시작일</Box>
                  <Input
                    {...register('startDate')}
                    type="number"
                    placeholder="YYYYMMDD"
                    onChange={onChangeInputs}
                    value={startDate}
                  />
                  <Box pl={2} color="red" fontSize="0.85rem">
                    {errors.startDate?.message}
                  </Box>
                </Box>
                <Box ml={1}>
                  <Box my={2}>종료일</Box>
                  <Input
                    {...register('endDate')}
                    type="number"
                    placeholder="YYYYMMDD"
                    onChange={onChangeInputs}
                    value={endDate}
                  />
                  <Box pl={2} color="red" fontSize="0.85rem">
                    {errors.endDate?.message}
                  </Box>
                </Box>
              </Flex>

              {/* 상품 설명 */}
              <Box my={2}>상품 설명</Box>
              <Textarea
                {...register('content')}
                minH="150px"
                size="sm"
                resize="none"
                onChange={onChangeInputs}
                value={content}
              />
              <Box pl={2} color="red" fontSize="0.85rem">
                {errors.content?.message}
              </Box>

              {/* 상품 등록 버튼 */}
            </ModalBody>
            <ModalFooter>
              <Flex justifyContent="center">
                <Button
                  type="submit"
                  w="150px"
                  size="md"
                  colorScheme="blue"
                  isLoading={addItemLoading}
                >
                  등록하기
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
