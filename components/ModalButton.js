import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function ModalButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ChevronRightIcon
        boxSize={6}
        color="gray.500"
        cursor="pointer"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.content}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
