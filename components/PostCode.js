import React from 'react';
import DaumPostCode from 'react-daum-postcode';

export default function PostCode(props) {
  const { height, setValue, setShowPostCodeModal } = props;

  const PostCodeStyle = {
    height: height,
  };

  const handleAddress = (data) => {
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

    setValue('zipCode', zoneCode);
    setValue('address', allAddress);
    setShowPostCodeModal(false);
  };

  return <DaumPostCode style={PostCodeStyle} onComplete={handleAddress} />;
}
