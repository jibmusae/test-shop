import Link from "next/link";
import AppLayout from "../components/AppLayout";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  ButtonGroup,
  Image,
  Icon,
} from "@chakra-ui/react";
import { CgClose, CgMathPlus, CgMathEqual } from "react-icons/cg";

export default function cart() {
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
        장바구니
      </Heading>
      <Table variant="simple" borderTop="1px" borderColor="gray.400">
        <Thead>
          <Tr>
            <Th w="64px">
              <Checkbox defaultIsChecked />
            </Th>
            <Th w="123px"></Th>
            <Th textAlign="center">상품 정보</Th>
            <Th w="110px" textAlign="center">
              수량
            </Th>
            <Th w="148px" isNumeric>
              금액
            </Th>
            <Th w="64px" textAlign="center"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Checkbox defaultIsChecked />
            </Td>
            <Td>
              <Image boxSize="75px" src="image/item/5600x.jpg" alt="5600x" />
            </Td>
            <Td>AMD Ryzen5 5600x</Td>
            <Td>
              <NumberInput size="sm" defaultValue={1} min={1} max={99}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td isNumeric>700,000원</Td>
            <Td>
              <Icon
                as={CgClose}
                boxSize={4}
                color="gray.500"
                cursor="pointer"
                // onClick={deleteCartItem}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox defaultIsChecked />
            </Td>
            <Td>
              <Image boxSize="75px" src="image/item/10100.jpg" alt="10100" />
            </Td>
            <Td>intel i3-10100</Td>
            <Td>
              <NumberInput size="sm" defaultValue={1} min={1} max={99}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td isNumeric>1,234,567원</Td>
            <Td>
              <Icon
                as={CgClose}
                boxSize={4}
                color="gray.500"
                cursor="pointer"
                // onClick={deleteCartItem}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Checkbox defaultIsChecked />
            </Td>
            <Td>
              <Image
                boxSize="75px"
                src="image/item/zotac_3070_te.jpg"
                alt="zotac_3070_te"
              />
            </Td>
            <Td>ZOTAC GAMING 3070 TWIN EDGE OC</Td>
            <Td>
              <NumberInput size="sm" defaultValue={1} min={1} max={99}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td isNumeric>12,345,678원</Td>
            <Td>
              <Icon
                as={CgClose}
                boxSize={4}
                color="gray.500"
                cursor="pointer"
                // onClick={deleteCartItem}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button colorScheme="red" size="sm" variant="outline" m={3}>
        선택삭제
      </Button>
      <Box
        w="100%"
        my={5}
        p={5}
        d="flex"
        justifyContent="flex-end"
        alignItems="center"
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        boxShadow
      >
        <Box mx={1}>전체</Box>
        <Box mx={1} color="red.400">
          <b>3</b>
        </Box>
        <Box>개의 상품금액</Box>
        <Box mx={1} color="red.400">
          <b>123,456,789</b>
        </Box>
        <Box>원</Box>
        <Icon as={CgMathPlus} boxSize={4} mx={2} color="gray" />
        <Box mx={1}>배송비</Box>
        <Box mx={1} color="red.400">
          <b>2,500</b>
        </Box>
        <Box>원</Box>
        <Icon as={CgMathEqual} boxSize={4} mx={2} color="gray" />
        <Box mx={1} color="red.400">
          <b>123,456,789</b>
        </Box>
        <Box>원</Box>
      </Box>
      <ButtonGroup
        d="flex"
        justifyContent="flex-end"
        w="100%"
        colorScheme="blue"
        spacing="3"
      >
        <Button w="150px" variant="outline">
          선택구매
        </Button>
        <Button w="150px">전체구매</Button>
      </ButtonGroup>
    </AppLayout>
  );
}
