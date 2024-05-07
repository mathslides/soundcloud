// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";

import "./SplashNavigation.css";
// import logo from "./calisomniaLogo.png";

function SplashNavigation({ isLoaded }) {


  return (
    <div className="splash-navbar">
      <nav id="splash-nav">
        <div id="splash-logo">
          <img id="splash-imgLogo" src="./logoforHeader.png" />
          {/* <NavLink id="splash-homeBtn" exact to="/">
            RECORDLABEL
          </NavLink> */}
        </div>

        <div className="splash-navBtnContainer">
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </nav>
    </div>
  );
}

export default SplashNavigation;
