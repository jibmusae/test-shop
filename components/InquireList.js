import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Td, Tr } from '@chakra-ui/react';

export default function InquireList({ inquire }) {
  // 작성일
  const today = moment().format('YYYY-MM-DD');
  const createdAt =
    today === moment(inquire.createdAt).format('YYYY-MM-DD')
      ? moment(inquire.createdAt).format('HH:mm')
      : moment(inquire.createdAt).format('YYYY-MM-DD');

  // 답변
  const answerStatus = inquire.answer_status ? '답변완료' : '미확인';

  return (
    <Link href="/inquireView/[id]" as={`/inquireView/${inquire.inquire_id}`}>
      <Tr cursor="pointer">
        <Td textAlign="center">{inquire.inquire_id}</Td>
        <Td>{inquire.title}</Td>
        <Td textAlign="center">{inquire.name}</Td>
        <Td textAlign="center">{createdAt}</Td>
        <Td textAlign="center">{answerStatus}</Td>
      </Tr>
    </Link>
  );
}
