import React from "react";
import songs from "../../data/songs"
import Section from "../Section"
import { useSelector } from "react-redux";
import Container from "../Container";
import SectionLiked from "../sectionLiked";

function Liked() {

    const databaseSongs = useSelector((state) => state.likedSongs?.likedSongs);
    // Handle null and undefined scenarios
    if (!databaseSongs) {
        return <div>Loading...</div>;
    }

    if (databaseSongs.length === 0) {
        return <div>No songs found.</div>;
    }
    return (
        <Container>
            <SectionLiked
                title="Liked Songs"
                more="/blabla"
            // items={databaseSongs}
            />
        </Container>
    )
}

export default Liked
