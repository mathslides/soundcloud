import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import Section from "../Section";
import { getPlaylists } from "../../store/playlist";
import { getAllSongs } from "../../store/songs";

function Home() {
	const dispatch = useDispatch();
	const databaseSongs = useSelector((state) => state.songs.songs);
	const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
	const { current, playing, controls } = useSelector(state => state.player);

	useEffect(() => {
		if (!databaseSongs || databaseSongs?.length === 0) {

			dispatch(getAllSongs());
		}

		if (!playlistSongs || playlistSongs?.length === 0) {

			dispatch(getPlaylists());
		}

	}, [databaseSongs, playlistSongs]);
	const limitedSongs = databaseSongs?.length ? databaseSongs?.slice(0, 19) : [];
	if (!limitedSongs) {
		return <div>Loading...</div>;
	}

	// if (limitedSongs.length === 0) {
	// 	return <div>No songs found.</div>;
	// }

	if (limitedSongs.length === 0) {
		return (
			<Container>
				<div className="flex items-center justify-center h-full py-80 text-white">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-white-900 mb-4">No Liked Songs Found</h2>
						<p className="text-lg text-white-700">You haven't liked any songs yet.</p>
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
