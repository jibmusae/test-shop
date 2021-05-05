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
  itemCheckRequestAction,
} from '../reducers/user';

export default function CartList({ cart }) {
  // cart
  const { itemId, itemName, itemImage, itemAmount } = cart;

  // 개수 수정
  const dispatch = useDispatch();
  const onChangeCount = (itemCount) => {
    dispatch(
      updateCartRequestAction({
        itemId,
        itemCount,
      })
    );
  };

  // 단품삭제 버튼
  const onClickRemoveItem = (e) => {
    dispatch(removeCartRequestAction(itemId));
  };

  // 상품 체크
  const onClickItemCheck = (e) => {
    const itemChecked = e.target.checked;
    dispatch(
      itemCheckRequestAction({
        itemId,
        itemChecked,
      })
    );
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox isChecked={cart?.itemChecked} onChange={onClickItemCheck} />
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
            value={cart?.itemCount}
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
