import React from 'react';
import Link from 'next/link';
import { Td, Tr } from '@chakra-ui/react';

export default function InquireList({ inquire }) {
  return (
    <Link href="/inquireView/[id]" as={`/inquireView/${inquire.id}`}>
      <Tr cursor="pointer">
        <Td textAlign="center">{inquire.id}</Td>
        <Td>{inquire.title}</Td>
        <Td textAlign="center">{inquire.user.name}</Td>
        <Td textAlign="center">{inquire.createDate}</Td>
        <Td textAlign="center">{inquire.status}</Td>
      </Tr>
    </Link>
  );
}
