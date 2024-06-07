import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import "./LoginForm.css";
import { useSelector, useDispatch } from "react-redux";
import { openLogin, closeLogin } from "../../store/modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

Modal.setAppElement(document.getElementById("root"));


function LoginFormModal() {
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.modal.loginShow);

  const closeModal = () => dispatch(closeLogin());
  const history = useHistory();

  return (
    <>

      <Modal
        isOpen={loginState}
        closeTimeoutMS={500}
        closeModal={closeModal}
        // style={customStyles}
        contentLabel="Login Modal"
        overlayClassName="OuterModal"
        className="InnerModal"
      >
        <LoginForm />
      </Modal>
    </>
  );
}

export default LoginFormModal;
