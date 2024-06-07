

import React from "react";
import Title from "./Title";
import SongItemLiked from "./songItemLiked";

function SectionLiked({ title, more, items }) {
    return (
        <section className="">
            <Title title={title} more={more} />
            <div className="text-white gap-4 pb-16">
                <SongItemLiked />
            </div>
        </section>
    );
}

export default SectionLiked;

