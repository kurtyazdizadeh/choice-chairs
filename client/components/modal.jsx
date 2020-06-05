import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function IntroModal(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        backdrop='static'
        className='modal'
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Choice Chairs</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Please note that this website is designed for demonstration purposes only.
            All products and content displayed on this site are fictitious.<br/>
            By proceeding and interacting with the site, you acknowledge that all of the contents of this site are
            not available for purchase, that you will not provide genuine financial or personal information,
            and that you are aware that no purchase will be processed.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0">
          <Button variant="primary" onClick={() => {
            handleClose();
            props.modalClicked();
          }}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
