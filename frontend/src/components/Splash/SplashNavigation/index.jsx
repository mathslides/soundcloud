import React from "react";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";


function SplashNavigation({ isLoaded }) {
  return (
    <div className="bg-gray-800">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
          </div>
          <div className="splash-navBtnContainer flex items-center">
            <LoginFormModal />
            <SignupFormModal />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SplashNavigation;

