import React, { useEffect } from "react";
import MusicPlayer from "../MusicPlayer";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { getAllSongs } from "../../store/songs";
import "./Dashboard.css";

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
    <div id="top-dashboard">
      <h1 id="dashboard-title">Top Songs On SoundWave</h1>
      <Navigation isLoaded={isLoaded} />
      <div className="dashboard-tracks-container">
        <div className="dashboard-songs">
          {songs?.allSongs.map((song) => {
            return (
              <div className="dashboard-cover-container" key={song.id}>
                <a className="dashboard-cover-title">{song.title}</a>
                <img className="dashboard-cover" src={song.imgUrl}></img>
                <audio
                  className="audio-dashboard"
                  controls
                  controlsList="nodownload"
                  src={song.audioFile}
                ></audio>
                <a className="dashboard-cover-artist">{song.artist}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
