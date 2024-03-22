import React, { useEffect } from "react";
import MusicPlayer from "../MusicPlayer";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaBook } from 'react-icons/fa';
import { getAllSongs } from "../../store/songs";
import "./Dashboard.css";
import Menu from "../Sidebar/Menu";
import Sidebar from "../Sidebar";
// import Content from "../Content";

export default function Dashboard({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) history.push("/dashboard");
    else history.push("/");
  }, [sessionUser]);

  const songs = useSelector((state) => state.songsRed.songs);

  return (

      <nav className="px-2">
        <ul className="flex flex-col">
          <li>
            <NavLink
              // activeClassName="bg-active"
              exact
              to={"/"}
              className="h-10 flex gap-x-4  text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
            >
              <span>
              <FaHome />
              </span>
              Ana sayfa
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active "
              to={"/search"}
              className="h-10 flex gap-x-4  text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
            >
              <span>
              <FaSearch />
              </span>
              Ara
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="bg-active"
              to={"/collection"}
              className="h-10 flex gap-x-4  text-white items-center text-sm font-semibold text-link rounded hover:text-white px-4"
            >
              <span>
              <FaBook />
              </span>
              Kitaplığın
            </NavLink>
          </li>
        </ul>
      </nav>

  );
}
