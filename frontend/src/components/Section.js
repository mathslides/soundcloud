import { NavLink } from "react-router-dom";
import SongItem from "./SongItem";
import Title from "./Title";
import { useSelector } from "react-redux";

function Section({ title, more = false, items }) {

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
