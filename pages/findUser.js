import Link from "next/link";
import AppLayout from "../components/AppLayout";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function findUser() {
  return (
    <AppLayout>
      <Tabs isFitted variant="enclosed-colored">
        <TabList mb="0.5rem">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>아이디 찾기</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            비밀번호 재설정
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <Accordion>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    휴대폰 번호로 인증
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  휴대폰 문자 인증 후 이메일(아이디) 라벨 컴포넌트 렌더링
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    휴대폰 본인 인증
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  휴대폰 본인 인증 후 이메일(아이디) 라벨 컴포넌트 렌더링
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
          <TabPanel p="0">
            <Accordion>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    휴대폰 번호로 인증
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  휴대폰 문자 인증 후 패스워드 재설정 컴포넌트 렌더링
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    휴대폰 본인 인증
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  휴대폰 본인 인증 후 패스워드 재설정 컴포넌트 렌더링
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    이메일 인증
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  이메일 인증 후 패스워드 재설정 컴포넌트 렌더링
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
