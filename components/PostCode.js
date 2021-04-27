import React, { useCallback } from 'react';
import DaumPostCode from 'react-daum-postcode';
import Modal from './Modal';

export default function PostCode(props) {
  const { height, setShowPostCodeModal, setZipCode, setAddress } = props;

  const PostCodeStyle = {
    height: height,
  };

  const handleAddress = useCallback((data) => {
    let allAddress = data.address;
    let extraAddress = '';
    let zoneCode = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      allAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZipCode(zoneCode);
    setAddress(allAddress);
    setShowPostCodeModal(false);
  }, []);

  return (
    <>
      <DaumPostCode style={PostCodeStyle} onComplete={handleAddress} />
    </>
  );
}
