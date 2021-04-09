import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  RiAccountBoxLine,
  RiMessage3Line,
  RiShoppingCart2Line,
} from "react-icons/ri";
import Footer from "./Footer";
import { logoutAction } from "../reducers";

export default function AppLayout({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <article>
        {isLoggedIn ? (
          <Box cursor="pointer" onClick={onLogout}>
            로그아웃
          </Box>
        ) : (
          <>
            <Link href="/signin">
              <Box cursor="pointer">로그인</Box>
            </Link>
            <Link href="/signup">
              <Box ml="1rem" cursor="pointer">
                회원가입
              </Box>
            </Link>
          </>
        )}
      </article>
      <header>
        <Link href="/">
          <Image
            w="150px"
            ml="3rem"
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
          {isLoggedIn && (
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
          )}
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
        <Footer />
      </footer>
    </>
  );
}
