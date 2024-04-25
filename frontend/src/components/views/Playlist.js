import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import SectionPlaylist from "../SectionPlaylist";

function Playlists() {
    const playlistSongs = useSelector((state) => state.playlists.playlists);

    if (!playlistSongs) {
        return <div>Loading...</div>;
    }

    if (playlistSongs.length === 0) {
        return <div>No playlists found.</div>;
    }

    return (
        <Container>
            {playlistSongs.map((playlist) => (
                <SectionPlaylist
                    key={playlist.id}
                    title={playlist.name}
                    more={`/playlist/${playlist.id}`} // Example link, replace with actual link
                    items={[playlist]} // Pass the playlist as an array since SectionPlaylist expects an array
                />
            ))}
        </Container>
    );
}

export default Playlists;
