import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';

export default function Modal(props) {
  const { width, height, padding, setShowModal, title, children } = props;

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <style jsx>
        {`
          .modalOverlay {
            position: fixed;
            width: 300vh;
            height: 300vh;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 9998;
          }

          .modalWrapper {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${width};
            height: ${height};
            padding: ${padding};
            border-radius: 10px;
            background: #ffffff;
            z-index: 9999;
          }

          .modalTitle {
            display: ${title ? 'flex' : 'none'};
            justify-contents: center;
            align-items: center;
            margin: 1rem 0 1.5rem;
            font-size: 20px;
            font-weight: 600;
          }

          .modalCloseButton {
            position: absolute;
            right: 0;
            margin-right: 1.5rem;
            cursor: pointer;
          }

          .modalContents {
            margin: ${title ? '0' : '1rem 0'};
          }
        `}
      </style>
      <div className="modalOverlay" tabIndex="-1" onClick={onCloseModal} />
      <div className="modalWrapper" tabIndex="-1">
        <div className="modalTitle">
          {title}
          <div className="modalCloseButton">
            <CloseIcon boxSize="16px" onClick={onCloseModal} />
          </div>
        </div>
        <div className="modalContents">{children}</div>
      </div>
    </>
  );
}
