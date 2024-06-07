
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTrendingSongs, setCurrentSong } from "../../../store/songs";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import Player from "../../BottomBar/Player"; // Import the Player component
import { resetPlayer, setCurrent, setPlaying } from "../../../store/player";

export default function TrendingTracks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { current, playing, controls } = useSelector(state => state.player);
  const [hoveredSongId, setHoveredSongId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false); // State to control player visibility

  useEffect(() => {
    dispatch(getTrendingSongs());
  }, [dispatch]);

  const trendingSongs = useSelector((state) => state.songs?.trendingSongs);

  const updateCurrent = (song) => {
    if (current && current.id === song.id) {
      if (playing) {
        controls?.pause();
        dispatch(setPlaying(false));
      } else {
        controls?.play();
        dispatch(setPlaying(true));
      }
    } else {
      dispatch(setCurrent(song));
      dispatch(setPlaying(true));
      setShowPlayer(true); // Show the player when a song is clicked
    }
  };

  const handleClick = () => {
    setShowPlayer(false); // Hide the player when clicked
  };

  return (
    <div className="tr-container">
      <h2 className="text-white text-2xl font-bold mb-10 mt-12 text-center">
        Hear what’s trending in the Calisomnia community
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 p-8">
        {trendingSongs?.trendSongs?.map((song) => (
          <div
            className={`relative rounded-lg overflow-hidden border border-transparent group transition-transform ease-in-out duration-300 transform ${hoveredSongId === song.id ? 'hover:-translate-y-1 hover:shadow-lg' : ''
              }`}
            key={song.id}
            onMouseEnter={() => setHoveredSongId(song.id)}
            onMouseLeave={() => setHoveredSongId(null)}
            onClick={() => updateCurrent(song)} // Make the song clickable
          >
            <img
              className="w-1024 h-682"
              src={song.imgUrl}
              alt={song.title}
            />
            {hoveredSongId === song.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-35 transition-opacity duration-300">
                {current?.id === song.id && playing ? <FaPauseCircle className="w-9 h-9 text-white" /> : <FaPlayCircle className="w-9 h-9 text-white" />
                }
              </div>
            )}
            <div className="flex flex-col bottom-0 left-0 right-0 bg-black bg-opacity-75 pl-0.5">
              <p className="text-white text-lg font-semibold ">
                {song.title}
              </p>
              <p className="text-gray-300">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded" onClick={handleClick}>
          Explore trending playlists
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-center mt-8 bg-black">
          {showPlayer && <Player />}
        </div>
      </div>
    </div >
  );
}
