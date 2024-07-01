import React from "react";
import "./CreatorSplash.css";
import creatorPic from "./creators-page.jpg";
// import calisomnia1 from "./Calisomnia-1.jpeg";
import calisomnia2 from "./calisomnia2.jpeg";
// import calisomnia3 from "./caliUpdated.jpeg ";

export default function CreatorSplash() {
  return (
    // <div className="rounded-lg overflow-hidden shadow-md mb-8 transition-transform duration-500 ease-in-out transform hover:scale-105">

    <div className="bg-gray-800 p-8 rounded-lg overflow-hidden shadow-lg flex flex-col items-center mt-12 mb-1 ">
      <div className="transition-transform duration-500 ease-in-out transform hover:scale-105">
        <img src={calisomnia2} alt="Creator" className="w-full h-96 " />

      </div>
      <div className="text-center">
        <h2 className="text-white text-4xl font-semibold m-4">Calling all creators</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-md">
          Get on Calisomnia to connect with fans, share your sounds, and grow your audience. What are you waiting for?
        </p>
        <button className="bg-transparent border border-white text-white pt-1.5 px-8 py-3 rounded-md hover:bg-white hover:text-black transition duration-300">
          Find out more
        </button>
      </div>
    </div>
  );
}
