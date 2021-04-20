import { useCallback, useMemo } from 'react';
import {
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Textarea,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AppLayout from '../components/AppLayout';

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
                type: currentError.type ?? 'validation',
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

export default function InquireWrite() {
  const validationSchema = useMemo(() =>
    yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      tel: yup.number().required(),
      title: yup.string().required(),
      contents: yup.string().required(),
    })
  );
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

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
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Table my="2.5rem" size="sm" borderTop="1px">
          <Tbody>
            <Tr>
              <Th w="200px" bgColor="gray.200">
                이름
              </Th>
              <Td>
                <Input name="name" size="sm" {...register('name')} />
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">이메일</Th>
              <Td>
                <Input size="sm" {...register('email')} />
                {errors.email?.email}
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">연락처</Th>
              <Td>
                <Input
                  size="sm"
                  placeholder="01012345678"
                  {...register('tel')}
                />
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">타이틀</Th>
              <Td>
                <Input size="sm" {...register('title')} />
              </Td>
            </Tr>
            <Tr>
              <Th bgColor="gray.200">문의내용</Th>
              <Td>
                <Textarea
                  minH="210px"
                  size="sm"
                  resize="none"
                  // {...register('contents')}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex mt="2rem" justifyContent="center">
          {/* TODO */}
          {/* 본인글일 경우 || 관리자일 경우 표시 */}
          <Button
            w="150px"
            mr="1rem"
            size="md"
            colorScheme="red"
            // onClick={onClickModify}
          >
            삭제
          </Button>
          {/* TODO */}
          {/* 본인글일 경우 '수정하기'로 교체표시 */}
          <Button type="submit" w="150px" size="md" colorScheme="blue">
            등록하기
          </Button>
        </Flex>
      </form>
    </AppLayout>
  );
}
