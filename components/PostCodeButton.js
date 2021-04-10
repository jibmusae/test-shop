import { useCallback } from "react";
import DaumPostCode from "react-daum-postcode";

export default function PostCodeButton(props) {
  const PostCodeStyle = {
    top: "50%",
    width: "450px",
    height: "500px",
    margin: "220px auto",
    padding: "1rem",
    boxSizing: "border-box",
  };

  const onClickOverlay = () => {
    props.setIsPostOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleAddress = useCallback((data) => {
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
    props.setIsPostOpen(false);

    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      <style jsx>
        {`
        .modalOverlay {
          display: ${(props) => (props.isDaumPost ? "block" : "none")}
          box-sizing: border-box;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 999;
        }

        .modalWrapper {
          display: ${(props) => (props.isDaumPost ? "block" : "none")};
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          outline: 0;
          backgroundColor: #fff,
          box-sizing: border-box;
          boxShadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
      `}
      </style>
      <div className="modalOverlay" onClick={onClickOverlay}>
        <div className="modalWrapper" tabIndex="-1">
          <DaumPostCode
            style={PostCodeStyle}
            onComplete={handleAddress}
            autoClose
          />
        </div>
      </div>
    </>
  );
}
