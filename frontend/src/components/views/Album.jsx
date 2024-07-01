
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import LoaderSpinner from "../Spinner";
import SectionAlbum from "../SectionAlbum";
import { getAllSongs } from "../../store/songs";

function Albums() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const albums = useSelector((state) => state.songs.songs);

    useEffect(() => {
        dispatch(getAllSongs())
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);



    if (!albums || albums.length === 0) {
        return (
            <Container>
                <div className="flex items-center justify-center h-full py-80 text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">No Albums Found</h2>
                        <p className="text-lg text-gray-700">There are no albums available.</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <SectionAlbum songs={albums} />
        </Container>
    );
}

export default Albums;
