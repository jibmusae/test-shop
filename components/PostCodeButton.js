import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import DaumPostCode from "react-daum-postcode";

export default function PostCodeButton({ setIsZipCode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddress = (data) => {
    let allAddress = data.address;
    let extraAddress = "";
    let zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      allAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setIsZipCode(zoneCode);
    // setIsAddress(allAddress);
  };

  return (
    <>
      <Button size="sm" color="gray" onClick={onOpen}>
        우편번호 검색
      </Button>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="1rem">
            <DaumPostCode
              onComplete={handleAddress}
              autoClose
              height="470px"
              // isDaumPost={isDaumPost}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
