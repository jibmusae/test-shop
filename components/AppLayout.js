import Link from "next/link";
import {
  Box,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  List,
  ListItem,
  Icon,
  Text,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  RiAccountBoxLine,
  RiMessage3Line,
  RiShoppingCart2Line,
} from "react-icons/ri";

export default function AppLayout({ children }) {
  return (
    <>
      {/* TODO */}
      {/* 로그인시 article 숨김 */}
      <article>
        <Link href="/signin">
          <Box cursor="pointer">로그인</Box>
        </Link>
        <Link href="/signup">
          <Box ml="1rem" cursor="pointer">
            회원가입
          </Box>
        </Link>
      </article>
      <header>
        <Link href="/">
          <Image
            w="150px"
            cursor="pointer"
            src="/image/logo_ydshop.png"
            alt="Header Logo Image"
          />
        </Link>
        <Box w="450px" h="35px">
          <InputGroup>
            <Input placeholder="검색" />
            <InputRightElement
              children={<SearchIcon color="gray.500" />}
              cursor="pointer"
            />
          </InputGroup>
        </Box>
        <List d="flex">
          <Link href="/profile">
            <ListItem
              d="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              color="#495057"
            >
              <Icon as={RiAccountBoxLine} boxSize="35px" />
              <Text fontSize="12px">마이메뉴</Text>
            </ListItem>
          </Link>
          <Link href="/inquire">
            <ListItem
              ml="1.5rem"
              d="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              color="#495057"
            >
              <Icon as={RiMessage3Line} boxSize="35px" />
              <Text fontSize="12px">문의하기</Text>
            </ListItem>
          </Link>
          <Link href="/cart">
            <ListItem
              ml="1.5rem"
              d="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              color="#495057"
            >
              <Icon as={RiShoppingCart2Line} boxSize="35px" />
              <Text fontSize="12px">장바구니</Text>
            </ListItem>
          </Link>
        </List>
      </header>
      <main>
        <Box
          w="1020px"
          m="2rem auto"
          p="3rem"
          bg="white"
          boxShadow="md"
          color="#868e96" // GRAY 6
        >
          {children}
        </Box>
      </main>
      <footer>
        <Heading as="h1" size="md" fontFamily="noto" mb="0.75rem">
          와이디커넥트(주)
        </Heading>
        <Text>
          대표이사 윤재원 / 사업자등록번호 421-01-02162 / 통신판매업신고번호
          xxxxxxxxxxx
        </Text>
        <Text>
          부산광역시 영도구 와치로 213 / 051-403-8444 / 010-6888-8444 /
          ydconnectcorp@gmail.com
        </Text>
      </footer>
    </>
  );
}
