import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastMaker(props) {
  const [show, setShow] = useState(props.show);
  const [timer, setTimer] = useState(props.timer || 8000);
  const text = props.text;

  useEffect(() => {
    const timeCounter = setTimeout(() => {
      toggleClose();
    }, timer);
  }, [show]);

  function toggleClose() {
    setShow(false);
    props.errorClose(props.closePath);
  }

  return (
    <ToastContainer
      className="p-3"
      position={props.position}
      style={{ zIndex: 1 }}
    >
      <Toast
        className="d-inline-block m-1"
        bg="danger"
        show={show}
        onClose={toggleClose}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Error</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body className={"text-white"}>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMaker;
