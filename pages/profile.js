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
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Button,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout";
import PostCodeButton from "../components/PostCodeButton";

export default function profile() {
  return (
    <AppLayout>
      <Tabs isFitted variant="enclosed-colored">
        {/* Tab Title */}
        <TabList mb="1rem">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>주문조회</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>개인정보</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h1" size="md">
              주문조회
            </Heading>
          </TabPanel>
          <TabPanel>
            {/* TODO 세션 유지시간 대응(5분) */}
            {/* <InputPassword /> */}
            <Heading as="h1" size="md">
              개인정보 설정
            </Heading>
            <Table my={5} size="sm" borderTop="1px">
              <Tbody>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    업체명
                  </Th>
                  <Td>와이디커넥트</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    대표자명
                  </Th>
                  <Td>윤재원</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    사업자 등록번호
                  </Th>
                  <Td>421-01-02162</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    주소
                  </Th>
                  <Td>
                    <InputGroup>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder="우편번호"
                        size="sm"
                      />
                      <PostCodeButton
                      // setIsZipCode={setIsZipCode}
                      // SetIsAddress={SetIsAddress}
                      />
                    </InputGroup>
                  </Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    이메일
                  </Th>
                  <Td>ydconnectcorp@gmail.com</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    휴대폰 번호
                  </Th>
                  <Td>010-6888-8444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
