import React from 'react';
import { Box, Td, Th, Tr } from '@chakra-ui/react';

export default function FormInput(props) {
  const { label, children, errors, nextErrors, table } = props;

  return (
    <>
      {table ? (
        <Tr>
          <Th w="200px" bgColor="gray.200">
            {label}
          </Th>
          <Td>
            <>{children}</>
            <Box pl={2} color="red" fontSize="0.85rem">
              {errors?.message || nextErrors?.message}
            </Box>
          </Td>
        </Tr>
      ) : (
        <>
          <Box my={2}>{label}</Box>
          <>{children}</>
          <Box pl={2} color="red" fontSize="0.85rem">
            {errors?.message || nextErrors?.message}
          </Box>
        </>
      )}
    </>
  );
}
