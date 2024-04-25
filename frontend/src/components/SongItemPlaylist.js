

import React, { useState } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/player";
import 'react-responsive-modal/styles.css';

function SongItemPlaylist({ item }) {
	const { current, playing, controls } = useSelector(state => state.player);
	const dispatch = useDispatch();
	const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
	const songsForPlaylist = playlistSongs.filter(song => song.playlistId === item.id);
	const isCurrentItem = playing;
	const [hoveredIndex, setHoveredIndex] = useState(-1);

	const imageStyle = () => {
		switch (item.type) {
			case 'artist':
				return 'rounded-full';
			case 'podcast':
				return 'rounded-xl';
			default:
				return 'rounded';
		}
	}

	const updateCurrent = (song) => {
		if (current.id === song.id) {
			if (playing) {
				controls.pause();
			} else {
				controls.play();
			}
		} else {
			dispatch(setCurrent(song));
		}
	};

	const handleLike = (event, songId) => {
		event.stopPropagation(); // Prevent NavLink onClick from firing
		// Handle liking the song here
		// console.log("Liked Song ID:", songId);
	}

	return (
		<div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
			{songsForPlaylist.map((songItem, index) => (
				<div
					key={songItem.id}
					className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${hoveredIndex === index ? 'hovered' : ''}`}
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(-1)}
				>
					<div>
						<img
							src={songItem.Song.imgUrl || ""}
							alt={songItem.Song.title}
							className={`w-full h-48 object-cover ${imageStyle()}`}
						/>
						{hoveredIndex === index && (
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
								<div className="bg-green-600 rounded-full p-2" onClick={(e) => {
									e.stopPropagation(); // Prevent parent div click
									updateCurrent(songItem.Song);
								}}>
									{isCurrentItem ? (
										<FaPause className="text-white text-sm" />
									) : (
										<FaPlay className="text-white text-sm" />
									)}
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



// import React, { useState } from "react";
// import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrent } from "../store/player";
// import 'react-responsive-modal/styles.css';

// function SongItemPlaylist({ item }) {
// 	const { current, playing, controls } = useSelector(state => state.player);
// 	const dispatch = useDispatch();
// 	const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
// 	const songsForPlaylist = playlistSongs.filter(song => song.playlistId === item.id);
// 	const isCurrentItem = playing;
// 	const [hoveredIndex, setHoveredIndex] = useState(-1);

// 	const imageStyle = () => {
// 		switch (item.type) {
// 			case 'artist':
// 				return 'rounded-full';
// 			case 'podcast':
// 				return 'rounded-xl';
// 			default:
// 				return 'rounded';
// 		}
// 	}

// 	const updateCurrent = (song) => {
// 		if (current.id === song.id) {
// 			if (playing) {
// 				controls.pause();
// 			} else {
// 				controls.play();
// 			}
// 		} else {
// 			dispatch(setCurrent(song));
// 		}
// 	};

// 	const handleLike = (event, songId) => {
// 		event.stopPropagation(); // Prevent NavLink onClick from firing
// 		// Handle liking the song here
// 		// console.log("Liked Song ID:", songId);
// 	}

// 	return (
// 		<div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
// 			{songsForPlaylist.map((songItem, index) => (
// 				<div
// 					key={songItem.id}
// 					className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${hoveredIndex === index ? 'hovered' : ''}`}
// 					onMouseEnter={() => setHoveredIndex(index)}
// 					onMouseLeave={() => setHoveredIndex(-1)}
// 				>
// 					<div>
// 						<img
// 							src={songItem.Song.imgUrl || ""}
// 							alt={songItem.Song.title}
// 							className={`w-full h-48 object-cover ${imageStyle()}`}
// 						/>
// 						{hoveredIndex === index && (
// 							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// 								<div className="bg-green-600 rounded-full p-2" onClick={(e) => {
// 									e.stopPropagation(); // Prevent parent div click
// 									updateCurrent(songItem.Song);
// 								}}>
// 									{isCurrentItem ? (
// 										<FaPause className="text-white text-sm" />
// 									) : (
// 										<FaPlay className="text-white text-sm" />
// 									)}
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 					<div className="p-4">
// 						<div className="flex flex-col justify-between h-full">
// 							<div className="flex flex-col">
// 								<h6 className="text-white font-semibold mb-1">{songItem.Song.title}</h6>
// 								<p className="text-gray-400 text-sm mb-2">{songItem.Song.artist}</p>
// 							</div>
// 							<div className="flex justify-end">
// 								<div style={{ width: "18px", height: "18px" }} onClick={(e) => handleLike(e, songItem.Song.id)}>
// 									<FaRegHeart color="white" size={18} />
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			))} 
// 		</div>
// 	);
// }

// export default SongItemPlaylist;
