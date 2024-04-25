

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FaPlay, FaPause, FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrent } from "../store/player";
// import { addSongToPlaylist } from "../store/playlist";
// import { Modal } from 'react-responsive-modal';
// import 'react-responsive-modal/styles.css';
// import { addToPlaylistSongs } from "../store/playlistSongs";
// import toast, { Toaster } from "react-hot-toast";
// import { addLikedSong, deleteLikedSong, getLikedSongs } from "../store/liked";

// function SongItem({ item }) {
// 	const { current, playing, controls } = useSelector(state => state.player);
// 	const dispatch = useDispatch();

// 	const [isLiked, setIsLiked] = useState(false);
// 	const [showModal, setShowModal] = useState(false);
// 	const [newPlaylistName, setNewPlaylistName] = useState("");
// 	const [error, setError] = useState("");
// 	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// 	const databaseSongs = useSelector((state) => state.playlists.playlists);
// 	const likedState = useSelector((state) => state.likedSongs?.likedSongs);
// 	const { session } = useSelector(state => state);
// 	const userId = session.user.id;
// 	const userPlaylists = databaseSongs.filter(playlist => playlist?.userId === userId);
// 	const isCurrentItem = (current?.id === item.id && playing);


// 	console.log("likedState", likedState);
// 	console.log("isLiked", item.title, isLiked);
// 	// console.log("item  in songitem--------", item);

// 	// Check if the song is already liked
// 	useEffect(() => {
// 		const checkLikedStatus = async () => {
// 			try {
// 				// Check if the current song is in the liked list
// 				const likedSongs = await dispatch(getLikedSongs());
// 				const isLiked = likedSongs?.some(likedSong => likedSong.songId === item.id);
// 				setIsLiked(isLiked);
// 			} catch (error) {
// 				console.error("Error fetching liked songs:", error);
// 			}
// 		};

// 		checkLikedStatus();
// 	}, [dispatch, isLiked]);

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

// 	const handleLiked = async () => {
// 		try {
// 			console.log("in the handleLiked");
// 			const songId = item.id;
// 			const payload = { userId, songId };
// 			const result = await dispatch(addLikedSong(payload));
// 			console.log('like result', result);

// 			if (result) {
// 				// Update local state to reflect the change
// 				setIsLiked(true);
// 				toast.success('Song has been added to Liked!', {
// 					duration: 1000,
// 					position: 'top-right',
// 				});
// 			}
// 		} catch (error) {
// 			console.error("Failed to update liked status:", error);
// 			toast.error('Failed to update liked status. Please try again.', {
// 				duration: 2000,
// 				position: 'top-right',
// 			});
// 		}
// 	};

// 	const handleUnliked = async () => {
// 		try {
// 			console.log("in the handleUnliked");
// 			const result = await dispatch(deleteLikedSong(item.id));
// 			console.log('unlike result', result);
// 			if (result) {
// 				// Update local state to reflect the change
// 				setIsLiked(false);
// 				toast.success('Song has been removed from Liked!', {
// 					duration: 1000,
// 					position: 'top-right',
// 				});
// 			}
// 		} catch (error) {
// 			console.error("Failed to update liked status:", error);
// 			toast.error('Failed to update liked status. Please try again.', {
// 				duration: 2000,
// 				position: 'top-right',
// 			});
// 		}
// 	};

// 	const updateCurrent = () => {
// 		if (current.id === item.id) {
// 			if (playing) {
// 				controls.pause();
// 			} else {
// 				controls.play();
// 			}
// 		} else {
// 			dispatch(setCurrent(item));
// 		}
// 	}

// 	const handleDropdownToggle = () => {
// 		setIsDropdownOpen(!isDropdownOpen);
// 	}

// 	const handleDropdownItemClick = (action) => {
// 		switch (action) {
// 			case "add-to-playlist":
// 				setShowModal(true); // Open the modal
// 				break;
// 			case "option2":
// 				// Handle option 2
// 				break;
// 			default:
// 				break;
// 		}
// 		setIsDropdownOpen(false);
// 	}

// 	const handleCreatePlaylist = async () => {
// 		try {
// 			if (!newPlaylistName) {
// 				setError("Please enter a playlist name.");
// 				return;
// 			}
// 			const songId = item.id;

// 			const payload = {
// 				userId,
// 				name: newPlaylistName,
// 				songId,
// 			};

// 			const result = await dispatch(addSongToPlaylist(payload));
// 			if (result) {
// 				toast.success('Playlist has been created!', {
// 					duration: 3000,
// 					position: 'top-right',
// 				});
// 				setNewPlaylistName("");
// 				setShowModal(false);
// 				setError("");
// 			}
// 		} catch (error) {
// 			console.error("Failed to add song to playlist:", error);
// 			setError("Failed to add song to playlist. Please try again.");
// 		}
// 	}

// 	const handleAddToPlaylist = async (playlistId) => {
// 		try {
// 			const songId = item.id;
// 			const payload = {
// 				userId,
// 				playlistId,
// 				songId,
// 			};

// 			const result = await dispatch(addToPlaylistSongs(payload));
// 			if (result) {
// 				toast.success('Song has been added!', {
// 					duration: 1000,
// 					position: 'top-right',
// 				});
// 				// Close the modal after adding to playlist
// 				setShowModal(false);
// 			}
// 		} catch (error) {
// 			console.error("Failed to add song to playlist:", error);
// 		}
// 	}

// 	return (
// 		<div>
// 			<div
// 				className="bg-gray-900 rounded-lg overflow-auto shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg "
// 			>
// 				<div className="relative">
// 					<NavLink to="/dashboard">
// 						<img
// 							src={item.imgUrl}
// 							alt={item.title}
// 							className={`w-full h-48 object-cover ${imageStyle()}`}
// 						/>
// 						<div className="absolute inset-0 flex items-center justify-center">
// 							<div className="bg-green-600 rounded-full p-2" onClick={updateCurrent} >
// 								{isCurrentItem ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm" />}
// 							</div>
// 						</div>
// 					</NavLink>
// 				</div>
// 				<div className="p-4">
// 					<div className="flex flex-col">
// 						<div className="flex items-center gap-4 justify-between">
// 							<p className="text-gray-400">{item.artist}</p>
// 							<div className="relative">
// 								<FaEllipsisV className="text-gray-400" onClick={handleDropdownToggle} />

// 								{isDropdownOpen && (
// 									<div className="absolute right-0 mt-1 w-48 bg-black rounded-lg shadow-lg py-2 z-10">
// 										<div
// 											className="px-4 py-2 hover:bg-blue-900 cursor-pointer"
// 											onClick={() => handleDropdownItemClick("add-to-playlist")}
// 										>
// 											Add to Playlist
// 										</div>
// 										<div
// 											className="px-4 py-2 hover:bg-blue-900 cursor-pointer"
// 											onClick={() => handleDropdownItemClick("option2")}
// 										>
// 											Option 2
// 										</div>
// 									</div>
// 								)}
// 							</div>
// 						</div>

// 						<div className="flex items-center gap-4 justify-between">
// 							<h6 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{item.title}</h6>
// 							{
// 								isLiked ?
// 									<FaHeart color="red" size={18} onClick={handleUnliked} /> :
// 									<FaRegHeart color="white" size={18} onClick={handleLiked} />
// 							}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Modal for adding to playlist */}
// 				<Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{
// 					modal: 'custom-modal',
// 					closeButton: 'custom-closeButton',
// 				}}>
// 					<div className="bg-gray-900 p-8 rounded-lg w-96">
// 						<h3 className="text-lg font-semibold text-white mb-4">Add to Playlist</h3>
// 						<h2 className="text-white font-semibold">Existing Playlists</h2>
// 						<div className="flex flex-col gap-4">
// 							{userPlaylists.length > 0 ? (
// 								userPlaylists.map((playlist) => (
// 									<div
// 										key={playlist?.id}
// 										className="bg-gray-800 flex items-center justify-between rounded-lg p-4 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
// 									>
// 										<h3 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{playlist?.name}</h3>
// 										<button
// 											className="bg-green-500 text-white px-4 py-1 rounded-lg"
// 											onClick={() => handleAddToPlaylist(playlist?.id)}
// 										>
// 											Add
// 										</button>
// 									</div>
// 								))
// 							) : (
// 								<p className="text-white">No playlist found!</p>
// 							)}
// 						</div>
// 						<div className="mt-4">
// 							<h2 className="text-white font-semibold">Create New Playlist</h2>
// 							<div className="flex items-center">
// 								<input
// 									type="text"
// 									placeholder="Playlist Name"
// 									value={newPlaylistName}
// 									onChange={(e) => setNewPlaylistName(e.target.value)}
// 									className="border border-gray-700 px-3 py-1 rounded-lg w-full mt-2 focus:outline-none focus:border-blue-500"
// 								/>
// 								<button
// 									onClick={handleCreatePlaylist}
// 									className="bg-green-500 text-white px-4 py-1 ml-2 rounded-lg"
// 								>
// 									Create
// 								</button>
// 							</div>
// 							{error && <p className="text-red-500 mt-2">{error}</p>}
// 						</div>
// 						<button
// 							onClick={() => setShowModal(false)}
// 							className="bg-red-500 text-white px-4 py-1 rounded-lg mt-4"
// 						>
// 							Close
// 						</button>
// 					</div>
// 				</Modal>
// 			</div>
// 			<Toaster />
// 		</div>
// 	);
// }

// export default SongItem;



import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaEllipsisV } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/player";
import { addSongToPlaylist } from "../store/playlist";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { addToPlaylistSongs } from "../store/playlistSongs";
import toast, { Toaster } from "react-hot-toast";
import { addLikedSong, deleteLikedSong, getLikedSongs } from "../store/liked";

function SongItem({ item }) {
	const { current, playing, controls } = useSelector(state => state.player);
	const dispatch = useDispatch();

	const [isLiked, setIsLiked] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [newPlaylistName, setNewPlaylistName] = useState("");
	const [error, setError] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const databaseSongs = useSelector((state) => state.playlists.playlists);
	const likedState = useSelector((state) => state.likedSongs?.likedSongs);
	const { session } = useSelector(state => state);
	const userId = session.user.id;
	const userPlaylists = databaseSongs.filter(playlist => playlist?.userId === userId);

	console.log("likedState", likedState);
	console.log("isLiked", item.title, isLiked);

	// Check if the song is already liked
	useEffect(() => {
		const checkLikedStatus = async () => {
			try {
				// Check if the current song is in the liked list
				const likedSongs = await dispatch(getLikedSongs());
				const isLiked = likedSongs?.some(likedSong => likedSong.songId === item.id);
				setIsLiked(isLiked);
			} catch (error) {
				console.error("Error fetching liked songs:", error);
			}
		};

		checkLikedStatus();
	}, [dispatch, isLiked]);

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

	const handleLiked = async () => {
		try {
			console.log("in the handleLiked");
			const songId = item.id;
			const payload = { userId, songId };
			const result = await dispatch(addLikedSong(payload));
			console.log('like result', result);

			if (result) {
				// Update local state to reflect the change
				setIsLiked(true);
				toast.success('Song has been added to Liked!', {
					duration: 1000,
					position: 'top-right',
				});
			}
		} catch (error) {
			console.error("Failed to update liked status:", error);
			toast.error('Failed to update liked status. Please try again.', {
				duration: 2000,
				position: 'top-right',
			});
		}
	};

	const handleUnliked = async () => {
		try {
			console.log("in the handleUnliked");
			const result = await dispatch(deleteLikedSong(item.id));
			console.log('unlike result', result);
			if (result) {
				// Update local state to reflect the change
				setIsLiked(false);
				toast.success('Song has been removed from Liked!', {
					duration: 1000,
					position: 'top-right',
				});
			}
		} catch (error) {
			console.error("Failed to update liked status:", error);
			toast.error('Failed to update liked status. Please try again.', {
				duration: 2000,
				position: 'top-right',
			});
		}
	};

	const updateCurrent = () => {
		if (current.id === item.id) {
			if (playing) {
				controls.pause();
			} else {
				controls.play();
			}
		} else {
			dispatch(setCurrent(item));
		}
	}

	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	}

	const handleDropdownItemClick = (action) => {
		switch (action) {
			case "add-to-playlist":
				setShowModal(true); // Open the modal
				break;
			case "option2":
				// Handle option 2
				break;
			default:
				break;
		}
		setIsDropdownOpen(false);
	}

	const handleCreatePlaylist = async () => {
		try {
			if (!newPlaylistName) {
				setError("Please enter a playlist name.");
				return;
			}
			const songId = item.id;

			const payload = {
				userId,
				name: newPlaylistName,
				songId,
			};

			const result = await dispatch(addSongToPlaylist(payload));
			if (result) {
				toast.success('Playlist has been created!', {
					duration: 3000,
					position: 'top-right',
				});
				setNewPlaylistName("");
				setShowModal(false);
				setError("");
			}
		} catch (error) {
			console.error("Failed to add song to playlist:", error);
			setError("Failed to add song to playlist. Please try again.");
		}
	}

	const handleAddToPlaylist = async (playlistId) => {
		try {
			const songId = item.id;
			const payload = {
				userId,
				playlistId,
				songId,
			};

			const result = await dispatch(addToPlaylistSongs(payload));
			if (result) {
				toast.success('Song has been added!', {
					duration: 1000,
					position: 'top-right',
				});
				// Close the modal after adding to playlist
				setShowModal(false);
			}
		} catch (error) {
			console.error("Failed to add song to playlist:", error);
		}
	}

	return (
		<div>
			<div
				className="bg-gray-900 rounded-lg overflow-auto shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
			>
				<div className="relative">
					<NavLink to="/dashboard">
						<img
							src={item.imgUrl}
							alt={item.title}
							className={`w-full h-48 object-cover ${imageStyle()}`}
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="bg-green-600 rounded-full p-2" onClick={updateCurrent}>
								{current.id === item.id && playing ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm" />}
							</div>
						</div>
					</NavLink>
				</div>
				<div className="p-4">
					<div className="flex flex-col">
						<div className="flex items-center gap-4 justify-between">
							<p className="text-gray-400">{item.artist}</p>
							<div className="relative">
								<FaEllipsisV className="text-gray-400" onClick={handleDropdownToggle} />

								{isDropdownOpen && (
									<div className="absolute right-0 mt-1 w-48 bg-black rounded-lg shadow-lg py-2 z-10">
										<div
											className="px-4 py-2 hover:bg-blue-900 cursor-pointer"
											onClick={() => handleDropdownItemClick("add-to-playlist")}
										>
											Add to Playlist
										</div>
										<div
											className="px-4 py-2 hover:bg-blue-900 cursor-pointer"
											onClick={() => handleDropdownItemClick("option2")}
										>
											Option 2
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="flex items-center gap-4 justify-between">
							<h6 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{item.title}</h6>
							{
								isLiked ?
									<FaHeart color="red" size={18} onClick={handleUnliked} /> :
									<FaRegHeart color="white" size={18} onClick={handleLiked} />
							}
						</div>
					</div>
				</div>

				{/* Modal for adding to playlist */}
				<Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{
					modal: 'custom-modal',
					closeButton: 'custom-closeButton',
				}}>
					<div className="bg-gray-900 p-8 rounded-lg w-96">
						<h3 className="text-lg font-semibold text-white mb-4">Add to Playlist</h3>
						<h2 className="text-white font-semibold">Existing Playlists</h2>
						<div className="flex flex-col gap-4">
							{userPlaylists.length > 0 ? (
								userPlaylists.map((playlist) => (
									<div
										key={playlist?.id}
										className="bg-gray-800 flex items-center justify-between rounded-lg p-4 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
									>
										<h3 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{playlist?.name}</h3>
										<button
											className="bg-green-500 text-white px-4 py-1 rounded-lg"
											onClick={() => handleAddToPlaylist(playlist?.id)}
										>
											Add
										</button>
									</div>
								))
							) : (
								<p className="text-white">No playlist found!</p>
							)}
						</div>
						<div className="mt-4">
							<h2 className="text-white font-semibold">Create New Playlist</h2>
							<div className="flex items-center">
								<input
									type="text"
									placeholder="Playlist Name"
									value={newPlaylistName}
									onChange={(e) => setNewPlaylistName(e.target.value)}
									className="border border-gray-700 px-3 py-1 rounded-lg w-full mt-2 focus:outline-none focus:border-blue-500"
								/>
								<button
									onClick={handleCreatePlaylist}
									className="bg-green-500 text-white px-4 py-1 ml-2 rounded-lg"
								>
									Create
								</button>
							</div>
							{error && <p className="text-red-500 mt-2">{error}</p>}
						</div>
						<button
							onClick={() => setShowModal(false)}
							className="bg-red-500 text-white px-4 py-1 rounded-lg mt-4"
						>
							Close
						</button>
					</div>
				</Modal>
			</div>
			<Toaster />
		</div>
	);
}

export default SongItem;

