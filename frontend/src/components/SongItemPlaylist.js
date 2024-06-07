
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/player";
import 'react-responsive-modal/styles.css';
import { getSongsInPlaylist } from "../store/playlistSongs";

function SongItemPlaylist({ item }) {
	const dispatch = useDispatch();
	const { current, playing, controls } = useSelector(state => state.player);
	const playlistSongs = useSelector(state => state.playlistSongs?.playlistSongs);
	const songsForPlaylist = playlistSongs.filter(song => song?.playlistId === item?.id);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const loggedInUser = useSelector((state) => state.session?.user?.id);

	useEffect(() => {
		// Ensure that we fetch songs only once when the component mounts or when the loggedInUser changes
		if (loggedInUser) {
			dispatch(getSongsInPlaylist(item?.id)); // Pass the playlist ID
		}
	}, [dispatch, loggedInUser, item?.id]);

	const updateCurrent = (song) => {
		if (!current || current?.id !== song?.id) {
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

	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
			{songsForPlaylist.length === 0 ? (
				<div className="col-span-full text-center py-8">
					<h2 className="text-2xl font-bold text-white mb-2">There are no songs here</h2>
					<p className="text-gray-400">Please add some songs to the playlist.</p>
				</div>
			) : (
				songsForPlaylist.map((songItem, index) => (
					<div
						key={songItem?.id}
						className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${hoveredIndex === index ? 'hovered' : ''}`}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
					>
						<div>
							<img
								src={songItem?.Song?.imgUrl || ""}
								alt={songItem?.Song?.title}
								className="w-full h-48 object-cover rounded"
							/>
							{hoveredIndex === index && (
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
									<div className="bg-green-600 rounded-full p-2" onClick={(e) => {
										e.stopPropagation();
										updateCurrent(songItem?.Song);
									}}>
										{current?.id === songItem?.Song?.id && playing ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm" />}
									</div>
								</div>
							)}
						</div>

						<div className="p-4">
							<div className="flex flex-col">
								<div className="flex items-center gap-4 justify-between">
									<p className="text-gray-400">{songItem?.Song?.artist}</p>
									<div className="relative">
										<FaEllipsisV className="text-gray-400"
										// onClick={handleDropdownToggle}
										/>

										{isDropdownOpen && (
											<div className="absolute right-0 mt-1 w-48 bg-black rounded-lg shadow-lg py-2 z-10">
												<div
													className="px-4 py-2 hover:bg-green-900 cursor-pointer"
												// onClick={() => handleDropdownItemClick("add-to-playlist")}
												>
													Add to Playlist
												</div>
												<div
													className="px-4 py-2 hover:bg-green-900 cursor-pointer"
												// onClick={() => handleDropdownItemClick("option2")}
												>
													Option 2
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="flex items-center gap-4 justify-between">
									<h6 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{songItem.Song.title}</h6>
									<FaRegHeart color="white" size={18} />

								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default SongItemPlaylist;
