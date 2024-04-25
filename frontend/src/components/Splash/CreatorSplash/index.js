import React from "react";
import "./CreatorSplash.css";
import creatorPic from "./creators-page.jpg";

export default function CreatorSplash() {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center mt-12 mb-16">
      <img src={creatorPic} alt="Creator" className="w-full h-auto rounded-lg mb-8 shadow-md" />
      <div className="text-center">
        <h2 className="text-white text-4xl font-semibold mb-4">Calling all creators</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-md">
          Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?
        </p>
        <button className="bg-transparent border border-white text-white pt-1.5 px-8 py-3 rounded-md hover:bg-white hover:text-black transition duration-300">
          Find out more
        </button>
      </div>
    </div>
  );
}
