import { NavLink } from "react-router-dom";
import SongItem from "./SongItem";
import Title from "./Title";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedSongs } from "../store/liked";

function Section({ title, more = false, items }) {
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state);
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getLikedSongs(userId));
    }
  }, [dispatch, userId]);

  return (
    <section className="">
      <Title title={title} more={more} />
      <div className="grid text-white grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-16">
        {items?.map((item) => (
          <SongItem item={item} key={item?.id} />
        ))}
      </div>
    </section>
  );
}

export default Section;
