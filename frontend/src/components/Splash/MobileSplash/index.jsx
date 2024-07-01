import React from "react";
import "./MobileSplash.css";

export default function MobileSplash() {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center mt-16 mb-12">
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl font-semibold mb-2">Welcome to Calisomnia</h1>
        <p className="text-gray-300 text-lg">Experience the best music wherever you go.</p>
      </div>
      <div className="rounded-lg overflow-hidden shadow-md mb-8 transition-transform duration-500 ease-in-out transform hover:scale-105">
        <img src="./frame2.png" alt="Mobile" className="w-full h-auto" />
      </div>
    </div>
  );
}
