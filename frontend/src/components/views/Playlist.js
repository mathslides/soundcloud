import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import SectionPlaylist from "../SectionPlaylist";
import { getAllSongs } from "../../store/songs";
import { getPlaylists } from "../../store/playlist";
import { getSongsInPlaylist } from "../../store/playlistSongs";

function Playlists() {
    const playlistSongs = useSelector((state) => state.playlists.playlists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!playlistSongs || playlistSongs?.length === 0) {
            dispatch(getPlaylists());
        }
    }, [playlistSongs]);
    if (!playlistSongs) {
        return <div>Loading...</div>;
    }
    if (playlistSongs.length === 0) {
        return (
            <Container>
                <div className="flex items-center justify-center h-full py-80 text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white-900 mb-4">No playlist Found</h2>
                        <p className="text-lg text-white-700">You haven't add any playlist yet.</p>
                    </div>
                </div>
            </Container>
        );
    }
    return (
        <Container>
            {playlistSongs.map((playlist) => (
                <SectionPlaylist
                    key={playlist?.id}
                    title={playlist?.name}
                    more={`/playlist/${playlist?.id}`}
                    items={[playlist]}
                />
            ))}
        </Container>
    );
}

export default Playlists;
