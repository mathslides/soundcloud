import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent, setPlaying } from "../store/player";
import { getOne } from "../store/songs";
import { FaPause, FaPlay } from "react-icons/fa";

function SectionAlbum({ songs }) {
  const dispatch = useDispatch();
  const { current, playing, controls } = useSelector((state) => state.player);

  const fetchAndPlaySong = async (songId) => {
    try {
      const response = await dispatch(getOne(songId));
      const song = response?.currentSong;
      if (song) {
        dispatch(setCurrent(song));
        dispatch(setPlaying(true));
        if (controls?.play) {
          controls.play();
        }
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const handlePlayPause = (songId) => {
    if (current?.id === songId && playing) {
      dispatch(setPlaying(false));
      if (controls?.pause) {
        controls.pause();
      }
    } else if (current?.id === songId && !playing) {
      dispatch(setPlaying(true));
      if (controls?.play) {
        controls.play();
      }
    } else {
      fetchAndPlaySong(songId);
    }
  };

  return (
    <div className="album-card mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-white">Albums</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {songs && songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song?.id}
              className="song-item bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {song?.title}
                </h4>
                <p className="text-gray-400">{song?.artist}</p>
              </div>
              {song?.hasFile === "1" && (
                <div className="mt-4">
                  <button
                    onClick={() => handlePlayPause(song?.id)}
                    className="text-white px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 focus:outline-none"
                  >
                    {current?.id === song?.id && playing ? (
                      <FaPause className="text-white text-sm" />
                    ) : (
                      <FaPlay className="text-white text-sm" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-300">No songs available</p>
        )}
      </div>
    </div>
  );
}

export default SectionAlbum;
