import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import SectionLiked from "../sectionLiked";

function Liked() {
    const databaseSongs = useSelector((state) => state.likedSongs?.likedSongs);
    // Handle null and undefined scenarios
    if (!databaseSongs) {
        return (
            <Container>
                <div>Loading...</div>
            </Container>
        );
    }

    if (databaseSongs.length === 0) {
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
            <SectionLiked
                title="Liked Songs"
                more="/blabla"
            // items={databaseSongs}
            />
        </Container>
    );
}


export default Liked;
