import React from "react";
import {
  FaHome,
  FaFolderOpen,
  FaUserCheck,
  FaMusic,
  FaHeart,
  FaFolderPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-300 flex flex-col bg-black fixed h-full left-0 top-0 overflow-y-auto">
      <a href="#" className="my-4 mx-auto">
        <img
          src="/assets/calisomniaLogo.png"
          alt="logo"
          className="h-11"
          style={{ width: "160px" }}
        />
      </a>
      <nav className="px-4">
        <ul className="flex flex-col">
          <li>
            <NavLink
              to={"/dashboard"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
              exact
            >
              <span className="mr-3">
                <FaHome size={15} />
              </span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/album"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaFolderOpen size={15} />
              </span>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/artists"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaUserCheck size={15} />
              </span>
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/playlists"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaMusic size={15} />
              </span>
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/liked"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaHeart size={15} />
              </span>
              Liked
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/createplaylist"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaFolderPlus size={15} />
              </span>
              Create Playlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/logout"}
              className="h-12 flex items-center text-white font-semibold rounded  px-6 my-1 transition-colors duration-200"
              activeClassName="bg-gray-700 text-white"
            >
              <span className="mr-3">
                <FaSignOutAlt size={15} />
              </span>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
