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
  itemCheckAction,
} from '../reducers/user';

export default function CartList({ cart }) {
  // cart
  const itemId = cart.item_id;
  const count = cart.count;
  const name = cart.Item.name;
  const price = cart.Item.price;
  const src = cart.Item.Image.src;
  const alt = cart.Item.Image.alt;

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

  // 상품 체크
  const onClickItemCheck = (e) => {
    const itemChecked = e.target.checked;
    // dispatch(
    //   itemCheckAction({
    //     itemId,
    //     itemChecked,
    //   })
    // );
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox
            // isChecked={cart.itemChecked}
            onChange={onClickItemCheck}
          />
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
            value={count}
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
            onClick={onClickRemoveItem}
          />
        </Td>
      </Tr>
    </Tbody>
  );
}
