import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import SectionPlaylist from "../SectionPlaylist";
import { getPlaylists } from "../../store/playlist";
import LoaderSpinner from "../Spinner";

function Playlists() {
    const playlists = useSelector((state) => state.playlists.playlists);
    const loggedInUser = useSelector((state) => state.session.user.id);

    const filteredList = playlists?.filter((list) => list?.userId == loggedInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists());
    }, [loggedInUser, dispatch]);

    if (!filteredList) {
        return <LoaderSpinner />;
    }

    if (filteredList.length === 0) {
        return (
            <Container>
                <div className="flex items-center justify-center h-full py-80 text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">No playlist Found</h2>
                        <p className="text-lg text-gray-700">You haven't added any playlist yet.</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {filteredList.map((playlist) => (
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
