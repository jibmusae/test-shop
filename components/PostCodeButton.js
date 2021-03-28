import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function ModalButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  handleAddress = (data) => {
    let AllAddress = data.address;
    let extraAddress = "";
    let zoneCodes = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setState({
      fullAddress: AllAddress,
      zoneCode: zoneCodes,
    });
  };

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
          <ModalCloseButton />
          <ModalBody>
            <DaumPostCode
              onComplete={handleAddress}
              autoClose
              width={width}
              height={height}
              style={modalStyle}
              isDaumPost={isDaumPost}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
