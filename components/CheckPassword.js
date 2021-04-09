import { Heading, Flex, Text, Input, Button } from "@chakra-ui/react";

export default function CheckPassword() {
  return (
    <>
      <Heading
        flex="1"
        as="h1"
        size="lg"
        mb="2rem"
        fontFamily="noto"
        textAlign="center"
        color="#212529" // GRAY 9
      >
        비밀번호 확인
      </Heading>
      <Flex
        w="350px"
        m="1rem auto"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text mt={3}>개인정보 보호를 위해 비밀번호를 다시 확인합니다.</Text>
        <Input mt={6} name="password" type="password" placeholder="비밀번호" />
        <Button mt={3} colorScheme="blue" size="md" isFullWidth>
          확인
        </Button>
      </Flex>
    </>
  );
}
