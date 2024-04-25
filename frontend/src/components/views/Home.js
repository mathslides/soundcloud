import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import Section from "../Section";
import { getPlaylists } from "../../store/playlist";

function Home() {
	const dispatch = useDispatch();
	const databaseSongs = useSelector((state) => state.songs.songs);

	useEffect(() => {
		dispatch(getPlaylists());
	}, [dispatch]);

	const limitedSongs = databaseSongs ? databaseSongs.slice(0, 10) : [];
	if (!limitedSongs) {
		return <div>Loading...</div>;
	}

	if (limitedSongs.length === 0) {
		return <div>No songs found.</div>;
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
