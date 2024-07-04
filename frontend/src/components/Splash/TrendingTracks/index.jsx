import React, { useEffect, useState } from "react";
import {
  FaPauseCircle,
  FaPlayCircle,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent, setPlaying } from "../../../store/player";
import { getOne, getTrendingSongs } from "../../../store/songs";
import Player from "../../BottomBar/Player";

export default function TrendingTracks() {
  const dispatch = useDispatch();
  const { current, playing, controls } = useSelector((state) => state.player);
  const [hoveredSongId, setHoveredSongId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState(null);
  const [singleSong, setSingleSong] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchTrendingSongs();
  }, [dispatch]);

  const fetchTrendingSongs = async () => {
    try {
      setLoader(true);
      await dispatch(getTrendingSongs());
      setLoader(false);
    } catch (error) {
      console.error("Error fetching trending songs:", error);
      setLoader(false);
    }
  };

  const trendingSongs = useSelector((state) => state.songs?.trendingSongs);

  const fetchOne = async (songId) => {
    if (!songId) return;
    try {
      const response = await dispatch(getOne(songId));
      setSingleSong(response?.currentSong);
      return response?.currentSong;
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const updateCurrent = async (e, song) => {
    e.stopPropagation();
    if (current && current.id === song?.id) {
      if (playing) {
        if (controls?.pause) {
          controls.pause();
        }
        dispatch(setPlaying(false));
      } else {
        if (controls?.play) {
          controls.play();
        }
        dispatch(setPlaying(true));
      }
    } else {
      const fetchedSong = await fetchOne(song?.id);
      dispatch(setCurrent(fetchedSong || song));
      dispatch(setPlaying(true));
      setShowPlayer(true);
    }
  };

  const handleClick = () => {
    setShowPlayer(false);
  };

  const handleWatchOnYouTube = (e, youtubeUrl) => {
    e.stopPropagation();
    setYoutubeLink(youtubeUrl);
  };

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loader) {
    return (
      <div className="tr-container">
        <h2 className="text-white text-2xl font-bold mb-10 mt-12 text-center">
          Hear what’s trending in the Calisomnia community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {Array(15)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 mb-2"></div>
                  <div className="h-4 bg-gray-700 w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tr-container">
      <h2 className="text-white text-2xl font-bold mb-10 mt-12 text-center">
        Hear what’s trending in the Calisomnia community
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 p-8">
        {trendingSongs?.trendSongs?.map((song) => (
          <div
            className={`relative rounded-lg overflow-hidden border border-transparent group transition-transform ease-in-out duration-300 transform ${
              hoveredSongId === song?.id
                ? "hover:-translate-y-1 hover:shadow-lg"
                : ""
            }`}
            key={song?.id}
            onMouseEnter={() => setHoveredSongId(song?.id)}
            onMouseLeave={() => setHoveredSongId(null)}
          >
            <img
              className="w-1024 h-682"
              src={song?.imgUrl}
              alt={song?.title}
            />
            {hoveredSongId === song?.id && song?.hasFile === "1" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-35 transition-opacity duration-300 z-10">
                {current?.id === song?.id && playing ? (
                  <FaPauseCircle
                    className="w-9 h-9 text-white"
                    onClick={(e) => updateCurrent(e, song)}
                  />
                ) : (
                  <FaPlayCircle
                    className="w-9 h-9 text-white"
                    onClick={(e) => updateCurrent(e, song)}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col bottom-0 left-0 right-0 bg-black bg-opacity-75 pl-0.5 relative z-20">
              <div className="flex justify-between items-center">
                <p className="text-white text-lg font-semibold truncate-text max-w-full">
                  {song?.title}
                </p>
                {song?.link && (
                  <FaYoutube
                    className="text-gray-400 cursor-pointer text-3xl"
                    onClick={(e) => handleWatchOnYouTube(e, song?.link)}
                    title="Watch on YouTube"
                  />
                )}
              </div>
              <p className="text-gray-300 truncate-text max-w-full">
                {song?.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleClick}
        >
          Explore trending playlists
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-center mt-8 bg-black">
          {showPlayer && <Player />}
        </div>
      </div>
      {youtubeLink && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-4 relative">
            <button
              className="absolute right-6 top-6 text-white"
              onClick={() => setYoutubeLink(null)}
            >
              <FaTimes />
            </button>
            <iframe
              width="700"
              height="415"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                youtubeLink
              )}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
