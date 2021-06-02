import React, { useState } from 'react';
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
  const cartId = cart.cart_id;
  const count = cart.count;
  const checked = cart.checked;
  const name = cart.Item.name;
  const price = cart.Item.price * count;
  const src = cart.Item.Image.src;
  const alt = cart.Item.Image.alt;

  // 장바구니 수정
  const onChangeChecked = (e) => {
    dispatch(
      updateCartRequestAction({ cartId, checked: e.target.checked, count })
    );
  };
  const onChangeCount = (value) => {
    dispatch(updateCartRequestAction({ cartId, checked, count: value }));
  };

  // 단품삭제 버튼
  const dispatch = useDispatch();
  const onClickRemoveCart = (e) => {
    dispatch(removeCartRequestAction(cartId));
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox isChecked={checked} onChange={onChangeChecked} />
        </Td>
        <Td>
          <Image
            boxSize="75px"
            src={`http://localhost:3065/${src}`}
            alt={alt}
          />
        </Td>
        <Td>{name}</Td>
        <Td>
          <NumberInput
            size="sm"
            min={1}
            max={99}
            defaultValue={count}
            onChange={onChangeCount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
        <Td isNumeric>{price.toLocaleString('ko-KR')}원</Td>
        <Td>
          <Icon
            as={CgClose}
            boxSize={4}
            color="gray.500"
            cursor="pointer"
            onClick={onClickRemoveCart}
          />
        </Td>
      </Tr>
    </Tbody>
  );
}
