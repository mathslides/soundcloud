

import React from "react";
import Title from "./Title";
import SongItemPlaylist from "./SongItemPlaylist";

function SectionPlaylist({ title, more, items }) {

    return (

        <section className="">
            <Title title={title} more={more} />
            <div className="text-white gap-4">
                {items.map(item => (
                    <SongItemPlaylist item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}

export default SectionPlaylist;

