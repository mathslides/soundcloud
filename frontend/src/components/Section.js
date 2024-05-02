import { NavLink } from "react-router-dom";
import SongItem from "./SongItem";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { getLikedSongs } from "../store/liked";
import { useEffect, useState } from "react";

function Section({ title, more = false, items }) {
    useEffect(() => {
        checkLikedStatus()
    }, [])
    const dispatch = useDispatch();

    const checkLikedStatus = async () => {
        try {
            const likedSongs = await dispatch(getLikedSongs());
        } catch (error) {
            console.error("Error fetching liked songs:", error);
        }
    };
    return (
        <section className="">
            <Title title={title} more={more} />
            <div className="grid text-white  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.map(item => (
                    <SongItem item={item} key={item?.id} />
                ))}
            </div>
        </section>
    )
}

export default Section
