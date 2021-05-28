import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Heading,
  Table,
  Tbody,
  Input,
  Textarea,
  Flex,
  Button,
} from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';
import FormInput from '../components/FormInput';
import {
  addInquireRequestAction,
  updateInquireRequestAction,
} from '../reducers/inquire';

const inquireSchema = yup.object().shape({
  corporateName: yup
    .string()
    .required('업체명을 입력해주세요')
    .max(100, '업체명은 최대 100자 이내로 입력해주세요'),
  name: yup
    .string()
    .required('이름을 입력해주세요')
    .min(2, '이름은 최소 2자, 최대 100자로 입력해주세요')
    .max(100, '이름은 최소 2자, 최대 100자로 입력해주세요'),
  email: yup
    .string()
    .required('이메일 주소를 입력해주세요')
    .max(100, '이메일 주소는 최대 100자 이내로 입력해주세요'),
  tel: yup
    .string()
    .required('휴대폰 번호를 입력해주세요')
    .min(12, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요')
    .max(13, '휴대폰 번호는 하이픈 포함 최소 12자, 최대 13자로 입력해주세요'),
  title: yup
    .string()
    .required('타이틀을 입력해주세요')
    .max(100, '타이틀은 최대 100자 이내로 입력해주세요'),
  content: yup.string().required('문의내용을 입력해주세요'),
});

export default function InquireWrite() {
  // 라우터
  const router = useRouter();

  // 상태관리
  const { user } = useSelector((state) => state.user);
  const { mainInquire, addInquireDone } = useSelector((state) => state.inquire);
  const inquire = mainInquire.find(
    (v) => v.inquire_id == router.query.inquire_id
  );

  console.log(user);
  console.log(inquire);

  // 입력 초기값 설정
  let initialCorporateName = '';
  let initialName = '';
  let initialEmail = '';
  let initialTel = '';
  let initialTitle = '';
  let initialContent = '';
  let buttonName = '';

  if (inquire && user?.user_id === inquire.user_id) {
    initialCorporateName = inquire.corporate_name;
    initialName = inquire.name;
    initialEmail = inquire.email;
    initialTel = inquire.tel;
    initialTitle = inquire.title;
    initialContent = inquire.content;
    buttonName = '수정하기';
  } else if (user) {
    initialCorporateName = user.corporate_name;
    initialName = user.name;
    initialEmail = user.email;
    initialTel = user.tel;
    initialTitle = '';
    initialContent = '';
    buttonName = '등록하기';
  } else {
    initialCorporateName = '';
    initialName = '';
    initialEmail = '';
    initialTel = '';
    initialTitle = '';
    initialContent = '';
    buttonName = '등록하기';
  }

  // 휴대폰 번호 입력(하이픈)
  // const [tel, setTel] = useState(initialTel);
  // const onChangeTel = (e) => {
  //   const value = e.target.value.replace(/[^0-9]/g, '');
  //   let result = '';

  //   if (value.length < 4) {
  //     result = value;
  //   } else if (value.length < 7) {
  //     result = `${value.substr(0, 3)}-${value.substr(3)}`;
  //   } else if (value.length < 11) {
  //     result = `${value.substr(0, 3)}-${value.substr(3, 3)}-${value.substr(6)}`;
  //   } else {
  //     result = `${value.substr(0, 3)}-${value.substr(3, 4)}-${value.substr(
  //       7,
  //       4
  //     )}`;
  //   }
  //   setTel(result);
  //   setValue('tel', result);
  // };

  // 문의 작성, 수정
  const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    if (inquire) {
      dispatch(updateInquireRequestAction(data));
    } else {
      dispatch(addInquireRequestAction(data));
    }
  };

  // 페이지 이동
  useEffect(() => {
    if (addInquireDone) {
      Router.push('/inquire');
    }
  }, [addInquireDone]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(inquireSchema) });

  return (
    <AppLayout>
      <Heading
        as="h1"
        size="lg"
        fontFamily="noto"
        textAlign="center"
        mb="2rem"
        color="#212529" // GRAY 9
      >
        문의하기
      </Heading>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Table my="2.5rem" size="sm" borderTop="1px">
          <Tbody>
            {/* 업체명 */}
            <FormInput label="업체명" errors={errors.corporateName} table>
              <Input
                {...register('corporateName')}
                placeholder="업체명"
                defaultValue={initialCorporateName}
                size="sm"
              />
            </FormInput>

            {/* 이름 */}
            <FormInput label="이름" errors={errors.name} table>
              <Input
                {...register('name')}
                placeholder="이름"
                defaultValue={initialName}
                size="sm"
              />
            </FormInput>

            {/* 이메일 주소 */}
            <FormInput label="이메일 주소" errors={errors.email} table>
              <Input
                {...register('email')}
                placeholder="이메일 주소"
                defaultValue={initialEmail}
                size="sm"
              />
            </FormInput>

            {/* 휴대폰 번호 */}
            <FormInput label="휴대폰 번호" errors={errors.tel} table>
              <Input
                {...register('tel')}
                placeholder="010-1234-5678"
                defaultValue={initialTel}
                size="sm"
              />
            </FormInput>

            {/* 타이틀 */}
            <FormInput label="타이틀" errors={errors.title} table>
              <Input
                {...register('title')}
                placeholder="타이틀"
                defaultValue={initialTitle}
                size="sm"
              />
            </FormInput>

            {/* 문의내용 */}
            <FormInput label="문의내용" errors={errors.content} table>
              <Textarea
                {...register('content')}
                defaultValue={initialContent}
                minH="210px"
                resize="none"
              />
            </FormInput>
          </Tbody>
        </Table>
        <Flex mt="2rem" justifyContent="space-between">
          <Link href="/inquire">
            <Button
              w="150px"
              mr="1rem"
              size="md"
              colorScheme="blue"
              variant="outline"
            >
              돌아가기
            </Button>
          </Link>
          <Button type="submit" w="150px" size="md" colorScheme="blue">
            {buttonName}
          </Button>
        </Flex>
      </form>
    </AppLayout>
  );
}
