import React from "react";
import { useDispatch } from "react-redux";
import { openLogin } from "../../../store/modal";

export default function Search() {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <input
              className="block w-full bg-gray-700 border border-transparent focus:ring-white focus:border-white rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
              placeholder="Search for artists, bands, tracks, podcasts"
              type="search"
            />
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => dispatch(openLogin())}
            >
              Upload your own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
