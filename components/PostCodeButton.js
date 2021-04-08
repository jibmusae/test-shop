import DaumPostCode from "react-daum-postcode";

export default function PostCodeButton(props) {
  const handleAddress = (data) => {
    // open = { modalOpenFlg }
    // close = { closePostModal }
    // getZipCode = { getZipCode }
    // getAddress = { getAddress }
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

    props.getZipCode(zoneCode);
    props.getAddress(allAddress);
  };

  return (
    <>
      <DaumPostCode onComplete={handleAddress} autoClose height="470px" />
    </>
  );
}
