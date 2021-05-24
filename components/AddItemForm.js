import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import {
  IconButton,
  Box,
  Input,
  RadioGroup,
  Radio,
  Flex,
  Image,
  Textarea,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Modal from '../components/Modal';
import FormInput from './FormInput';
import {
  addItemRequestAction,
  uploadImageRequestAction,
} from '../reducers/item';

// DatePicker 언어 설정
registerLocale('ko', ko);

// yup
const addItemSchema = yup.object().shape({
  category: yup.number().required('카테고리를 선택해주세요'),
  name: yup
    .string()
    .required('상품명을 입력해주세요')
    .max(100, '상품명은 최대 100자 이내로 입력해주세요'),
  imageName: yup.string().required('상품이미지를 선택해주세요'),
  price: yup
    .string()
    .required('금액을 입력해주세요')
    .max(10, '상품 금액은 최대 10자 이내로 입력해주세요'),
  startDate: yup
    .string()
    .required('시작일을 입력해주세요')
    .min(10, '시작일은 하이픈 포함 10자로 입력해주세요')
    .max(10, '시작일은 하이픈 포함 10자로 입력해주세요'),
  endDate: yup
    .string()
    .required('종료일을 입력해주세요')
    .min(10, '종료일은 하이픈 포함 10자로 입력해주세요')
    .max(10, '종료일은 하이픈 포함 10자로 입력해주세요'),
  description: yup.string().required('상품설명을 입력해주세요'),
});

export default function AddItemForm() {
  // 상품 상태관리
  const { addItemLoading, addItemDone, imagePath } = useSelector(
    (state) => state.item
  );

  // 주소검색 모달
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // 이미지 선택
  const fileRef = useRef();
  const onClickImageUpload = () => {
    fileRef.current.click();
  };

  // 이미지 업로드
  const onChangeImage = (e) => {
    if (!e.target.files.length) {
      setValue('imageName', '');
      setValue('image', '');
    } else {
      const image = e.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append('image', image);
      dispatch(uploadImageRequestAction(imageFormData));

      setValue('imageName', image.name);
      setValue('image', imagePath);
    }
  };

  useEffect(() => {
    console.log(`imagePath : ${imagePath}`);
  }, [imagePath]);

  // 금액
  const [price, setPrice] = useState('');
  const onChangePrice = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length < 10) {
      result = value;
    } else {
      result = value.substr(0, 10);
    }

    setPrice(result);
    setValue('price', result);
  };

  // 시작일
  const [startDate, setStartDate] = useState(null);
  const onChangeStartDate = (date) => {
    if (!date) {
      setStartDate(null);
      setValue('startDate', '');
    } else {
      setStartDate(date);
      setValue('startDate', moment(date).format('YYYY-MM-DD'));
    }
  };

  // 종료일
  const [endDate, setEndDate] = useState(null);
  const onChangeEndDate = (date) => {
    if (!date) {
      setEndDate(null);
      setValue('endDate', '');
    } else {
      setEndDate(date);
      setValue('endDate', moment(date).format('YYYY-MM-DD'));
    }
  };

  // 상품 등록
  const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    console.log(data);
    dispatch(addItemRequestAction(data));
  };

  // 모달 닫기
  useEffect(() => {
    if (addItemDone) {
      setShowAddItemModal(false);
    }
  }, [addItemDone]);

  // react-hook-form 유효성 검사
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addItemSchema) });

  return (
    <>
      <IconButton
        colorScheme="blue"
        aria-label="Add Item"
        fontSize="20px"
        icon={<EditIcon />}
        onClick={(e) => setShowAddItemModal(true)}
      />
      {showAddItemModal && (
        <Modal
          width="450px"
          padding="0.5rem 1.5rem"
          title="상품 추가"
          setShowModal={setShowAddItemModal}
        >
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            encType="multipart/form-data"
            autoComplete="off"
          >
            {/* 카테고리 */}
            <FormInput label="카테고리" errors={errors.category}>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={Number(value)} onChange={onChange}>
                    <Flex justifyContent="space-around">
                      <Radio value={1}>CPU</Radio>
                      <Radio value={2}>메인보드</Radio>
                      <Radio value={3}>그래픽카드</Radio>
                      <Radio value={4}>그 외</Radio>
                    </Flex>
                  </RadioGroup>
                )}
              />
            </FormInput>

            {/* 상품명 */}
            <FormInput label="상품명" errors={errors.name}>
              <Input {...register('name')} placeholder="상품명" />
            </FormInput>

            {/* 상품 이미지 */}
            <Flex alignItems="flex-end">
              <Box flex={1} mr="0.5rem">
                <FormInput label="상품 이미지" errors={errors.imageName}>
                  <Input
                    {...register('image')}
                    type="file"
                    ref={fileRef}
                    onChange={onChangeImage}
                    d="none"
                  />
                  <InputGroup>
                    <Input
                      {...register('imageName')}
                      placeholder="이미지 선택"
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
                </FormInput>
              </Box>
              <Flex boxSize="70px">
                {imagePath && (
                  <Image
                    src={`http://localhost:3065/${imagePath}`}
                    alt={imagePath}
                  />
                )}
              </Flex>
            </Flex>

            {/* 금액 */}
            <FormInput label="금액" errors={errors.price}>
              <InputGroup>
                <Input
                  {...register('price')}
                  placeholder="0"
                  value={price}
                  onChange={onChangePrice}
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
            </FormInput>

            {/* 진행일시 */}
            <Flex>
              <Box mr={1}>
                <FormInput label="시작일" errors={errors.startDate}>
                  <Input {...register('startDate')} d="none" />
                  <DatePicker
                    locale="ko"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    onChange={onChangeStartDate}
                    selected={startDate}
                    customInput={<Input />}
                  />
                </FormInput>
              </Box>
              <Box ml={1}>
                <FormInput label="종료일" errors={errors.endDate}>
                  <Input {...register('endDate')} d="none" />
                  <DatePicker
                    locale="ko"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    onChange={onChangeEndDate}
                    selected={endDate}
                    customInput={<Input />}
                  />
                </FormInput>
              </Box>
            </Flex>

            {/* 상품 설명 */}
            <FormInput label="상품 설명" errors={errors.description}>
              <Textarea
                {...register('description')}
                minH="150px"
                resize="none"
              />
            </FormInput>

            {/* 상품 등록 버튼 */}
            <Flex justifyContent="center">
              <Button
                type="submit"
                w="150px"
                m="0.5rem 0"
                size="md"
                colorScheme="blue"
                isLoading={addItemLoading}
              >
                등록하기
              </Button>
            </Flex>
          </form>
        </Modal>
      )}
    </>
  );
}
