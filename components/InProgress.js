import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  Image,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function InProgress() {
  return (
    <>
      <Flex>
        <Heading
          flex="1"
          as="h1"
          size="lg"
          mb="2rem"
          fontFamily="noto"
          textAlign="center"
          color="#212529" // GRAY 9
        >
          진행중인 상품
        </Heading>
        <IconButton
          // TODO 관리자 로그인시 활성화
          // display="none"
          colorScheme="blue"
          aria-label="Add Item"
          fontSize="20px"
          icon={<EditIcon />}
        />
      </Flex>
      <Tabs isFitted variant="enclosed-colored">
        {/* Tab Title */}
        <TabList mb="1rem">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>CPU</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>메인보드</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>그래픽카드</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>메모리</Tab>
        </TabList>

        {/* Tab Detail */}
        <TabPanels>
          {/* CPU */}
          <TabPanel>
            <Flex
              h="220px"
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
              alignItems="center"
            >
              <Image boxSize="150px" src="/image/item/5600x.jpg" alt="5600x" />
              <Box w="476px" mx="2rem">
                <Heading
                  as="h2"
                  size="sm"
                  fontFamily="noto"
                  mb="0.5rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  AMD Ryzen5 5600X
                </Heading>
                <Text>
                  AMD(소켓AM4) / 4세대 (Zen 3) / 7nm / 6코어 / 12쓰레드 / 기본
                  클럭: 3.7GHz / 최대 클럭: 4.6GHz / L3 캐시: 32MB / TDP: 65W /
                  PCIe4.0 / 메모리 규격: DDR4 / 3200MHz / 내장그래픽: 미탑재 /
                  기술 지원: StoreMI, Ryzen Master, VR Ready 프리미엄 / 쿨러:
                  Wraith Stealth 포함
                </Text>
              </Box>
              <Flex
                w="120px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md">123,456,789원</Text>
                <NumberInput
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  defaultValue={1}
                  min={1}
                  max={99}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  장바구니
                </Button>
                <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
                  구매하기
                </Button>
                <Button
                  // TODO 관리자 로그인시 활성화
                  // display="none"
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="red"
                >
                  삭제
                </Button>
              </Flex>
            </Flex>
            <Flex
              h="220px"
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
              alignItems="center"
            >
              <Image boxSize="150px" src="/image/item/10100.jpg" alt="10100" />
              <Box w="476px" mx="2rem">
                <Heading
                  as="h2"
                  size="sm"
                  fontFamily="noto"
                  mb="0.5rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  인텔 코어i3-10세대 10100
                </Heading>
                <Text>
                  인텔(소켓1200) / 14nm / 4코어 / 8쓰레드 / 기본 클럭: 3.6GHz /
                  최대 클럭: 4.3GHz / L3 캐시: 6MB / TDP: 65W / PCIe3.0 / 메모리
                  규격: DDR4 / 2666MHz / 내장그래픽: 탑재 / 인텔 UHD 630 / 기술
                  지원: 하이퍼스레딩, 옵테인 / 쿨러: 인텔 기본쿨러 포함 /
                  출시가: 122달러(VAT별도)
                </Text>
              </Box>
              <Flex
                w="120px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md">123,456,789원</Text>
                <NumberInput
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  defaultValue={1}
                  min={1}
                  max={99}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  장바구니
                </Button>
                <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
                  구매하기
                </Button>
                <Button
                  // TODO 관리자 로그인시 활성화
                  // display="none"
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="red"
                >
                  삭제
                </Button>
              </Flex>
            </Flex>
          </TabPanel>

          {/* 메인보드 */}
          <TabPanel>
            <Flex
              h="220px"
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
              alignItems="center"
            >
              <Image
                boxSize="150px"
                src="/image/item/asrock_z590_sl.jpg"
                alt="asrock_z590_sl"
              />
              <Box w="476px" mx="2rem">
                <Heading
                  as="h2"
                  size="sm"
                  fontFamily="noto"
                  mb="0.5rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  ASRock Z590 스틸레전드
                </Heading>
                <Text>
                  인텔(소켓1200) / (인텔) Z590 / ATX (30.5x24.4cm) / 전원부:
                  14페이즈 / DDR4 / 메모리 용량: 최대 128GB / XMP / 옵테인 / VGA
                  연결: PCIe4.0 x16 / GPU 기술: CrossFire X / 그래픽 출력: HDMI,
                  DP / PCIe 슬롯: 5개 / M.2: 3개 / SATA3: 6개 / PS/2: 콤보 1개 /
                  USB 2.0: 후면 2개 / USB 3.0: 후면 2개 / USB 3.1: 후면 2개 /
                  기가비트 LAN / 2.5기가비트 LAN / UEFI / LED 라이트 / LED 헤더
                  / M.2 히트싱크 / POLYCHROME
                </Text>
              </Box>
              <Flex
                w="120px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md">123,456,789원</Text>
                <NumberInput
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  defaultValue={1}
                  min={1}
                  max={99}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  장바구니
                </Button>
                <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
                  구매하기
                </Button>
                <Button
                  // TODO 관리자 로그인시 활성화
                  // display="none"
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="red"
                >
                  삭제
                </Button>
              </Flex>
            </Flex>
            <Flex
              h="220px"
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
              alignItems="center"
            >
              <Image
                boxSize="150px"
                src="/image/item/gigabyte_z590_vg.jpg"
                alt="gigabyte_z590_vg"
              />
              <Box w="476px" mx="2rem">
                <Heading
                  as="h2"
                  size="sm"
                  fontFamily="noto"
                  mb="0.5rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  GIGABYTE Z590 VISION G
                </Heading>
                <Text>
                  인텔(소켓1200) / (인텔) Z590 / ATX (30.5x24.4cm) / DDR4 /
                  메모리 용량: 최대 128GB / XMP / 옵테인 / VGA 연결: PCIe4.0 x16
                  / GPU 기술: CrossFire / 그래픽 출력: HDMI, DP / PCIe 슬롯: 3개
                  / M.2: 4개 / SATA3: 6개 / PS/2: 콤보 1개 / USB 2.0: 후면 2개 /
                  USB 3.0: 후면 5개 / USB 3.1: 후면 2개 / 후면 1개 / 기가비트
                  LAN / 2.5기가비트 LAN / UEFI / LED 헤더 / M.2 히트싱크 / RGB
                  FUSION
                </Text>
              </Box>
              <Flex
                w="120px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md">123,456,789원</Text>
                <NumberInput
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  defaultValue={1}
                  min={1}
                  max={99}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  장바구니
                </Button>
                <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
                  구매하기
                </Button>
                <Button
                  // TODO 관리자 로그인시 활성화
                  // display="none"
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="red"
                >
                  삭제
                </Button>
              </Flex>
            </Flex>
          </TabPanel>

          {/* 그래픽카드 */}
          <TabPanel>
            <Flex
              h="220px"
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
              alignItems="center"
            >
              <Image
                boxSize="150px"
                src="/image/item/asus_3070_rsg_white.jpg"
                alt="asus_3070_rsg_white"
              />
              <Box w="476px" mx="2rem">
                <Heading
                  as="h2"
                  size="sm"
                  fontFamily="noto"
                  mb="0.5rem"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  ASUS ROG STRIX 지포스 RTX 3070 O8G GAMING OC D6 8GB WHITE
                </Heading>
                <Text>
                  RTX 3070 / 8nm / 부스트클럭: 1935MHz / 스트림 프로세서: 5888개
                  / PCIe4.0x16 / GDDR6(DDR6) / 출력단자: HDMI2.1, DP1.4 /
                  부가기능: 제로팬(0-dB기술), 8K 해상도 지원, 4K 해상도 지원,
                  HDR 지원, Dual BIOS, HDCP 2.3 / 정격파워 750W 이상 / 전원
                  포트: 8핀 x2개 / 3개 팬 / 가로(길이): 318.5mm / 백플레이트 /
                  LED 라이트 / AURA SYNC
                </Text>
              </Box>
              <Flex
                w="120px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="md">123,456,789원</Text>
                <NumberInput
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  defaultValue={1}
                  min={1}
                  max={99}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  장바구니
                </Button>
                <Button w="100px" mt="0.5rem" size="sm" colorScheme="blue">
                  구매하기
                </Button>
                <Button
                  // TODO 관리자 로그인시 활성화
                  // display="none"
                  w="100px"
                  mt="0.5rem"
                  size="sm"
                  colorScheme="red"
                >
                  삭제
                </Button>
              </Flex>
            </Flex>
          </TabPanel>

          {/* 메모리 */}
          <TabPanel>
            <Flex
              m="1rem"
              p="1.5rem"
              border="1px"
              borderRadius="lg"
              borderColor="gray.300"
              boxShadow="base"
            >
              진행중인 상품이 없습니다.
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
