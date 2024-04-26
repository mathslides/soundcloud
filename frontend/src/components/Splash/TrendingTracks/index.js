import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTrendingSongs } from "../../../store/songs";
import { FaPlayCircle } from "react-icons/fa";

export default function TrendingTracks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hoveredSongId, setHoveredSongId] = useState(null);

  useEffect(() => {
    dispatch(getTrendingSongs());
  }, [dispatch]);

  const trendingSongs = useSelector((state) => state.songs?.trendingSongs);

  return (
    <div className="tr-container">
      <h2 className="text-white text-2xl font-bold mb-10 mt-12 text-center">
        Hear what’s trending in the RecordLabel community
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {trendingSongs?.trendSongs?.map((song) => (
          <div
            className={`relative rounded-lg overflow-hidden border border-transparent group transition-transform ease-in-out duration-300 transform ${hoveredSongId === song.id ? 'hover:-translate-y-1 hover:shadow-lg' : ''
              }`}
            key={song.id}
            onMouseEnter={() => setHoveredSongId(song.id)}
            onMouseLeave={() => setHoveredSongId(null)}
          >
            <img
              className="w-full h-auto"
              src={song.imgUrl}
              alt={song.title}
            />
            {hoveredSongId === song.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
                <FaPlayCircle className="w-12 h-12 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
              <p className="text-white text-lg font-semibold mb-2">
                {song.title}
              </p>
              <p className="text-gray-300">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Explore trending playlists
        </button>
      </div>
    </div>
  );
}
