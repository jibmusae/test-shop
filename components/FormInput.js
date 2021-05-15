import React from 'react';
import { Box } from '@chakra-ui/react';

export default function FormInput(props) {
  const { label, children, errors, nextErrors } = props;

  return (
    <>
      <Box my={2}>{label}</Box>
      <>{children}</>
      <Box pl={2} color="red" fontSize="0.85rem">
        {errors?.message || nextErrors?.message}
      </Box>
    </>
  );
}
