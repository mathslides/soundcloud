import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import Section from "../Section";
import { getPlaylists } from "../../store/playlist";
import { getAllSongs } from "../../store/songs";
import Skeleton from "react-loading-skeleton";

function Home() {
	const dispatch = useDispatch();
	const databaseSongs = useSelector((state) => state.songs.songs);
	const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		if (!databaseSongs || databaseSongs?.length === 0) {
			dispatch(getAllSongs());
			fetchSongs()
		}
		if (!playlistSongs || playlistSongs?.length === 0) {
			dispatch(getPlaylists());
		}

	}, []);

	useEffect(() => {
		fetchSongs()
	}, [dispatch]);

	const limitedSongs = databaseSongs?.length ? databaseSongs?.slice(0, 19) : [];

	const fetchSongs = async () => {
		try {
			const data = await dispatch(getAllSongs());
			setSongs(data); // Assuming getAllSongs returns the data directly
		} catch (error) {
			console.error('Error fetching songs:', error);
			// Handle error state or retry logic if needed
		}
	};


	if (!limitedSongs) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Skeleton count={3} baseColor="#303030" highlightColor="#505050" />
			</div>
		);
	}
	if (limitedSongs.length === 0) {
		return (
			<Container>
				<div className="flex items-center justify-center h-full py-80 text-white">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-white-900 mb-4">No Songs Found</h2>
						<p className="text-lg text-white-700">You haven't added any songs yet.</p>
					</div>
				</div>
			</Container>
		);
	}
	return (
		<Container>
			<Section
				title="All Songs"
				more="/blabla"
				items={limitedSongs}
			/>
		</Container>
	);
}

export default Home;

