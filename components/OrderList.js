import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
} from '@chakra-ui/react';

export default function OrderList({ order }) {
  // 주문상태
  const ORDER_STATUS_COMPLETED_PAYMENT = 1; // 결제완료
  const ORDER_STATUS_INPROGRESS_WHOLESALE = 2; // 도매진행중
  const ORDER_STATUS_READY_DELIVERY = 3; // 배송준비중
  const ORDER_STATUS_ON_DELIVERY = 4; // 배송중
  const ORDER_STATUS_COMPLETED_DELIVERY = 5; // 배송완료
  const ORDER_STATUS_APPLIED_REFUND = 6; // 환불신청
  const ORDER_STATUS_ON_REFUND = 7; // 환불진행중
  const ORDER_STATUS_COMPLETED_REFUND = 8; // 환불완료

  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => setShowAlert(false);
  const cancelRef = useRef();

  // 주문일
  const orderDate = `주문일 : ${Number(
    order?.orderDate?.substr(0, 4)
  )}년 ${Number(order?.orderDate?.substr(4, 2))}월 ${Number(
    order?.orderDate?.substr(6, 2)
  )}일`;

  const onClickRefund = () => {
    // TODO 환불신청
    // order테이블.orderStatus를 6으로 update
    console.log('환불신청 클릭!');
    closeAlert();
  };

  return (
    <>
      <Box
        m="1rem 0 2rem"
        pt="1rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        boxShadow="base"
      >
        <Text ml="16px">{orderDate}</Text>
        {order?.item?.map((item) => (
          <Flex
            key={item?.key}
            h="100px"
            m="1rem"
            border="1px"
            borderColor="gray.300"
            borderRadius="lg"
            boxShadow="sm"
          >
            <Flex
              flex="1"
              borderRight="1px"
              borderColor="gray.300"
              alignItems="center"
            >
              <Image
                boxSize="80px"
                mx="1rem"
                src={item?.image?.src}
                alt={item?.image?.alt}
              />
              <Box flex="1">
                <Box mb="0.5rem">{item?.itemName}</Box>
                <Box>
                  {item?.price?.toLocaleString('ko-KR')}원・
                  {item?.count?.toLocaleString('ko-KR')}개
                </Box>
              </Box>
              <Box
                w="120px"
                textAlign="center"
                color={
                  ORDER_STATUS_APPLIED_REFUND > item?.orderStatus
                    ? 'blue.600'
                    : 'red'
                }
              >
                {item?.orderStatusKR}
              </Box>
            </Flex>
            <Flex
              w="150px"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                w="120px"
                mb="0.5rem"
                size="sm"
                colorScheme="blue"
                variant="outline"
              >
                배송조회
              </Button>
              <Button
                w="120px"
                size="sm"
                variant="outline"
                isDisabled={ORDER_STATUS_APPLIED_REFUND <= item?.orderStatus}
                onClick={() => setShowAlert(true)}
              >
                환불신청
              </Button>
              <AlertDialog
                motionPreset="slideInBottom"
                isOpen={showAlert}
                leastDestructiveRef={cancelRef}
                onClose={closeAlert}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader m="0" fontSize="lg" fontWeight="bold">
                      환불신청
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      정말로 환불신청을 진행하시겠습니까?
                      <Flex my="1.5rem" justifyContent="space-between">
                        <Button
                          w="100px"
                          size="sm"
                          colorScheme="blue"
                          ref={cancelRef}
                          onClick={closeAlert}
                        >
                          취소
                        </Button>
                        <Button
                          w="100px"
                          size="sm"
                          colorScheme="red"
                          onClick={onClickRefund}
                        >
                          환불
                        </Button>
                      </Flex>
                    </AlertDialogBody>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          </Flex>
        ))}
        <Box p="0 1.25rem 1rem" textAlign="right">
          총 금액 : {order?.amount?.toLocaleString('ko-KR')} 원
        </Box>
      </Box>
    </>
  );
}
