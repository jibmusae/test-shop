import React from 'react';
import {
  Tbody,
  Tr,
  Td,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Icon,
} from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';

export default function CartList({ cart }) {
  // 단품삭제 버튼
  const onClickRemove = (e) => {
    // TODO 단품삭제
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox />
        </Td>
        <Td>
          <Image boxSize="75px" src="image/item/5600x.jpg" alt="5600x" />
        </Td>
        <Td>{cart.item.itemName}</Td>
        <Td>
          <NumberInput size="sm" defaultValue={1} min={1} max={99}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
        <Td isNumeric>700,000원</Td>
        <Td>
          <Icon
            as={CgClose}
            boxSize={4}
            color="gray.500"
            cursor="pointer"
            // onClick={deleteCartItem}
          />
        </Td>
      </Tr>
    </Tbody>
  );
}
