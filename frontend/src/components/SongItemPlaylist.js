import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaSlideshare } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/player";
import 'react-responsive-modal/styles.css';
import { getSongsInPlaylist } from "../store/playlistSongs";

function SongItemPlaylist({ item }) {
	const dispatch = useDispatch();
	const { current, playing, controls } = useSelector(state => state.player);
	const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
	const songsForPlaylist = playlistSongs.filter(song => song.playlistId === item?.id);
	const [hoveredIndex, setHoveredIndex] = useState(null);

	useEffect(() => {
		if (!playlistSongs || playlistSongs?.length === 0) {
			dispatch(getSongsInPlaylist());
		}
	}, [playlistSongs]);

	const updateCurrent = (song) => {
		if (!current || current.id !== song.id) {
			dispatch(setCurrent(song));
		} else {
			playing ? controls.pause() : controls.play();
		}
	};

	const handleMouseEnter = (index) => {
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	const handleLike = (event, songId) => {
		// Handle like functionality
	};

	return (
		<div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
			{songsForPlaylist.map((songItem, index) => (
				<div
					key={songItem.id}
					className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${hoveredIndex === index ? 'hovered' : ''}`}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
				>
					<div>
						<img
							src={songItem.Song.imgUrl || ""}
							alt={songItem.Song.title}
							className="w-full h-48 object-cover rounded"
						/>
						{hoveredIndex === index && (
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
								<div className="bg-green-600 rounded-full p-2" onClick={(e) => {
									e.stopPropagation();
									updateCurrent(songItem?.Song);
								}}>
									{current?.id === songItem.Song.id && playing ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm" />}
								</div>
							</div>
						)}
					</div>
					<div className="p-4">
						<div className="flex flex-col justify-between h-full">
							<div className="flex flex-col">
								<h6 className="text-white font-semibold mb-1">{songItem.Song.title}</h6>
								<p className="text-gray-400 text-sm mb-2">{songItem.Song.artist}</p>
							</div>
							<div className="flex justify-end">
								<div style={{ width: "18px", height: "18px" }} onClick={(e) => handleLike(e, songItem.Song.id)}>
									<FaRegHeart color="white" size={18} />
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default SongItemPlaylist;
