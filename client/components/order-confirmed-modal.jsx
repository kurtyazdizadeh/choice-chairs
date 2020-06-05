import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function OrderConfirmedModal(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const history = useHistory();

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
          <Modal.Title>Order Confirmed!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Order Total: ${`${props.orderTotal}`}
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center border-top-0">
          <Button variant="primary" onClick={() => {
            handleClose();
            props.clearCart();
            history.push('/');
          }}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
