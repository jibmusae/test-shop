import AppLayout from "../components/AppLayout";
import InputPassword from "../components/InputPassword";
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
  Text,
  Button,
} from "@chakra-ui/react";

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
                    이름
                  </Th>
                  <Td>윤재원</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    이메일
                  </Th>
                  <Td>ydconnectcorp@gmail.com</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    사업자 등록번호
                  </Th>
                  <Td>421-01-02162</Td>
                </Tr>
                <Tr>
                  <Th w="200px" bgColor="gray.200">
                    이름
                  </Th>
                  <Td>윤재원</Td>
                </Tr>
              </Tbody>
            </Table>
            {/*   <Tr>
                <Th>이름</Th>
                <Td>
                  윤재원
                  <Button w="50px" ml="0.5rem" size="xs" colorScheme="gray">
                    변경
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Th>이름</Th>
                <Td>윤재원</Td>
              </Tr>
              <Tr>
                <Th>이름</Th>
                <Td>윤재원</Td>
              </Tr>
              <Tr>
                <Th>이름</Th>
                <Td>윤재원</Td>
              </Tr>
            </Table> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
