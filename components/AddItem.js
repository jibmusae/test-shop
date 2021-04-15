import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  FormControl,
  FormLabel,
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

export default function ModalButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 상품 이미지
  const [itemImage, setItemImage] = useState(null);
  const onChangeImage = (e) => {
    setItemImage(e.target.files[0]);
  };

  return (
    <>
      <IconButton
        // TODO 관리자 로그인시 활성화
        // display={user ? 'inline-flex' : 'none'}
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
            <FormControl id="itemCategory" mb="1rem">
              <FormLabel>카테고리</FormLabel>
              <RadioGroup defaultValue="1">
                <Flex justifyContent="space-around">
                  <Radio value="1">CPU</Radio>
                  <Radio value="2">메인보드</Radio>
                  <Radio value="3">그래픽카드</Radio>
                  <Radio value="4">그 외</Radio>
                </Flex>
              </RadioGroup>
            </FormControl>
            <FormControl id="itemName" mb="1rem">
              <FormLabel>상품명</FormLabel>
              <Input name="itemName" type="text" />
            </FormControl>
            <FormControl id="itemImage" mb="1rem">
              <FormLabel>상품 이미지</FormLabel>
              <Flex>
                <Input type="file" onChange={onChangeImage} />
              </Flex>
            </FormControl>
            <FormControl id="itemPrice" mb="1rem">
              <FormLabel>금액</FormLabel>
              <InputGroup>
                <Input
                  name="itemPrice"
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
            </FormControl>
            <Flex>
              <FormControl id="itemStartDate" mb="1rem" mr="1rem">
                <FormLabel>시작일</FormLabel>
                <Input
                  name="itemStartDate"
                  type="text"
                  placeholder="YYYYMMDD"
                />
              </FormControl>
              <FormControl id="itemEndDate" mb="1rem">
                <FormLabel>종료일</FormLabel>
                <Input name="itemEndDate" type="text" placeholder="YYYYMMDD" />
              </FormControl>
            </Flex>
            <FormControl id="itemContent" mb="1rem">
              <FormLabel>상품설명</FormLabel>
              <Textarea minH="150px" size="sm" resize="none" />
            </FormControl>
            <Flex justifyContent="center">
              <Button
                w="150px"
                size="md"
                colorScheme="blue"
                // onClick={onClickModify}
              >
                등록하기
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
