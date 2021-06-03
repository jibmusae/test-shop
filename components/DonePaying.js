import React from 'react';
import Link from 'next/link';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export default function DonePaying(props) {
  const { orderDate, orderId } = props;
  return (
    <>
      <Heading
        as="h1"
        size="lg"
        fontFamily="noto"
        textAlign="center"
        mb="2rem"
        color="#212529" // GRAY 9
      >
        결제완료
      </Heading>
      <Box>
        <Heading mt="2rem" mb="1rem" as="h1" size="md" textAlign="center">
          주문이 완료되었습니다.
        </Heading>
        <Flex flexDirection="column" alignItems="center">
          <Text my="0.5rem">주문일 : {orderDate}</Text>
          <Text>주문번호 : {orderId}</Text>
        </Flex>
      </Box>
    </>
  );
}
