import React from 'react';
import { useDispatch } from 'react-redux';
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
import {
  updateCartRequestAction,
  removeCartRequestAction,
} from '../reducers/user';

export default function CartList({ cart }) {
  // cart
  const { itemId, itemName, itemImage, itemCount, itemAmount } = cart;

  // 개수 수정
  const dispatch = useDispatch();
  const onChangeCount = (count) => {
    dispatch(
      updateCartRequestAction({
        itemId,
        count,
      })
    );
  };

  // 단품삭제 버튼
  const onClickRemoveItem = (e) => {
    dispatch(removeCartRequestAction(itemId));
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox />
        </Td>
        <Td>
          <Image boxSize="75px" src={itemImage?.src} alt={itemImage?.alt} />
        </Td>
        <Td>{itemName}</Td>
        <Td>
          <NumberInput
            size="sm"
            min={1}
            max={99}
            value={itemCount}
            onChange={onChangeCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
        <Td isNumeric>{itemAmount?.toLocaleString('ko-KR')}원</Td>
        <Td>
          <Icon
            as={CgClose}
            boxSize={4}
            color="gray.500"
            cursor="pointer"
            onClick={onClickRemoveItem}
          />
        </Td>
      </Tr>
    </Tbody>
  );
}
