// import { Icon } from "Icons";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';

function Menu() {
  return (
    <nav className="px-2">
      <ul className="flex flex-col">
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            exact
            to={"/"}
            className="h-10 flex gap-x-4 text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span>
            <FaHome />

            </span>
           Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            to={"/search"}
            className="h-10 flex gap-x-4 text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span>
            <FaSearch />
            </span>
            Playlist
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="bg-active text-white"
            to={"/collection"}
            className="h-10 flex gap-x-4 text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
          >
            <span>
            <FaBook />
            </span>
            Liked
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
