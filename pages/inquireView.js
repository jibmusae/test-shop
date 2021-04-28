import React from 'react';
import { Heading } from '@chakra-ui/react';
import AppLayout from '../components/AppLayout';

export default function inquireView() {
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
        문의하기
      </Heading>
    </AppLayout>
  );
}
