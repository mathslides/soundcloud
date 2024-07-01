import React from "react";
// import { Modal } from "../../context/Modal";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import "./LoginForm.css";
import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from "../../store/modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.modal.loginShow);

  const closeModal = () => dispatch(closeLogin());
  const history = useHistory();

  return (
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
  );
}

// Modal.setAppElement(document.getElementById("root"));
export default LoginFormModal;
