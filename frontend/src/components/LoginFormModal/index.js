// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import "./LoginForm.css";
import { useSelector, useDispatch } from "react-redux";
import { openLogin, closeLogin } from "../../store/modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function LoginFormModal() {
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.modal.loginShow);

  const closeModal = () => dispatch(closeLogin());
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");

    // setLoginModalOpen(true); // Open login modal
  };
  return (
    <>
      <button
        id="signInBtn"
        className="nav-bar-btn"
        onClick={handleLogin}
      >
        Sign In
      </button>
      <Modal
        isOpen={loginState}
        closeTimeoutMS={500}
        closeModal={closeModal}
        // style={customStyles}
        contentLabel="Login Modal"
        overlayClassName="OuterModal"
        className="InnerModal"
      >
        <LoginForm  />
      </Modal>
    </>
  );
}

export default LoginFormModal;
