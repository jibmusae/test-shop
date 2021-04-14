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
import AppLayout from '../components/AppLayout';

export default function InquireWrite() {
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
      <Table my={5} size="sm" borderTop="1px">
        <Tbody>
          <Tr>
            <Th w="200px" bgColor="gray.200">
              이름
            </Th>
            <Td>
              <Input size="sm" />
            </Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">이메일</Th>
            <Td>
              <Input size="sm" />
            </Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">휴대폰 번호</Th>
            <Td>
              <Input size="sm" />
            </Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">타이틀</Th>
            <Td>
              <Input size="sm" />
            </Td>
          </Tr>
          <Tr>
            <Th bgColor="gray.200">문의내용</Th>
            <Td>
              <Textarea minH="210px" size="sm" resize="none" />
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
        <Button
          w="150px"
          size="md"
          colorScheme="blue"
          // onClick={onClickPost}
        >
          등록하기
        </Button>
      </Flex>
    </AppLayout>
  );
}
