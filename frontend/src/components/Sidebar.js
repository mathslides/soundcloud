import { FaHome, FaSearch, FaMusic } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-1/6 flex flex-col bg-black fixed h-full left-0 top-0 overflow-y-auto">
      <a href="#" className="my-4 mx-auto">
        <img src="./calisomniaLogo.png" alt="logo" className="h-11" style={{ width: "160px" }} />
      </a>
      <nav className="px-4">
        <ul className="flex flex-col">
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              exact
              to={"/dashboard"} // Updated route to "/home"
              className="h-12 flex items-center text-white  font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <FaHome size={15} />
              </span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/dashboard"} // Updated route to "/home"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <FaSearch size={15} />
              </span>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/dashboard"} // Updated route to "/home"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <FaMusic size={15} />
              </span>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/artists"} // Updated route to "/home"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <FaMusic size={15} />
              </span>
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/playlists"} // Updated route to "/home"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <FaMusic size={15} />
              </span>
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/liked"} // Updated route to "/home"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <AiOutlineHeart size={15} />
              </span>
              Liked
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active text-white"
              to={"/createplaylist"}  // Updated route to "/upload"
              className="h-12 flex items-center text-white font-semibold text-link rounded hover:text-white px-6 my-1"
            >
              <span className="mr-3">
                <AiOutlinePlus size={15} />
              </span>
              Create Playlist
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
