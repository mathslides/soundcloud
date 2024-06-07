
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SplashNavigation from "./SplashNavigation";
import Slider from "./Slider";
import Search from "./Search";
import TrendingTracks from "./TrendingTracks";
import MobileSplash from "./MobileSplash";
import CreatorSplash from "./CreatorSplash";
import SplashFooter from "./SplashFooter";
import Modal from "react-modal";
import SignupForm from "../SignupFormModal/SignupForm";
import LoginFormPage from "../LoginFormModal/LoginForm"; // Import LoginFormPage
import Footer from "./TrendingTracks/footer/footer";
import Navigation from "../Navigation";

Modal.setAppElement(document.getElementById("root"));

export default function Splash({ isLoaded }) {
  const history = useHistory();
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // State for login modal

  const handleSignup = () => {
    history.push("/register");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  const closeModal1 = () => {
    setSignupModalOpen(false);
  };

  const closeModal2 = () => {
    setLoginModalOpen(false); // Close login modal
  };

  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <SplashNavigation isLoaded={isLoaded} handleSignup={handleSignup} handleLogin={handleLogin} />
      <div className="">
        <Slider />
        <div className="mt-8">
          <Search />
        </div>
        <TrendingTracks />
      </div>
      <div className="">
        <MobileSplash />
        <CreatorSplash />
      </div>
      <div className="py-12">
        <div className=" bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center mb-16">
          <div className="text-center text-white">
            <div className="text-4xl mb-6 font-bold">Thanks for listening. Now join in.</div>
            <p className="text-lg mb-8">
              Save tracks, follow artists and build playlists. All for free.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-lightseagreen hover:bg-green-400 text-white px-6 py-3 rounded-md mr-4 transition duration-300"
                onClick={handleSignup} // Redirect to the register page
              >
                Create account
              </button>
              <button
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-md transition duration-300"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        {/* <SplashFooter /> */}
        <Footer />

      </div>

    </div>
  );
}
