import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { updateCartRequestAction } from '../reducers/user';

export default function CartList({ cart }) {
  // 상태관리
  const { user } = useSelector((state) => state.user);

  // 개수 수정
  const dispatch = useDispatch();
  const [count, setCount] = useState(cart.itemCount);
  const onChangeCount = (e) => {
    setCount(e);
    console.log(`count : ${count}, e : ${e}`);
  };

  // 단품삭제 버튼
  const onClickRemoveItem = (e) => {
    // TODO 단품삭제
    console.log(cart.itemCount, count);
  };

  return (
    <Tbody>
      <Tr>
        <Td>
          <Checkbox />
        </Td>
        <Td>
          <Image
            boxSize="75px"
            src={cart.itemImage?.src}
            alt={cart.itemImage?.alt}
          />
        </Td>
        <Td>{cart.itemName}</Td>
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
        <Td isNumeric>{cart.itemAmount?.toLocaleString('ko-KR')}원</Td>
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
