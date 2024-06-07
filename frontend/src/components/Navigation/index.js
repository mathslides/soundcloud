import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = <ProfileButton user={sessionUser} />;
  // } else {
  //   sessionLinks = (
  //     <div className="navBtnContainer">
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </div>
  //   );
  // }



  return (
    <div className="navbar bg-gray-800 py-3">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="./logoforHeader.png" className="h-12 w-48 mr-4" alt="Logo" />
            <NavLink
              exact
              to="/"
              className="text-white text-lg font-bold"
            >
            </NavLink>
          </div>

          <div className="flex items-center">
            <NavLink
              exact
              to="/"
              className="text-gray-300 hover:text-white px-4"
            >
              Home
            </NavLink>
            <NavLink
              to="/aboutUs"
              className="text-gray-300 hover:text-white px-4"
            >
              About Us
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-300 hover:text-white px-4"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="text-gray-300 hover:text-white px-4"
            >
              Create Account
            </NavLink>
            {/* <NavLink
              to="/"
              className="text-gray-300 hover:text-white px-4"
            >
              {sessionUser?.username}
            </NavLink> */}
          </div>
        </nav>
      </div>

      {/* {isLoaded && sessionLinks} */}
    </div>
  );
}

export default Navigation;
