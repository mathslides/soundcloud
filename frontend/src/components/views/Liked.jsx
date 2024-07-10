import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import SectionLiked from "../sectionLiked";
import LoaderSpinner from "../Spinner";
import { getLikedSongs } from "../../store/liked";

function Liked() {
  const likedSongs = useSelector((state) => state.likedSongs?.likedSongs);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.session?.user?.id);

  const filteredLikedSongs = likedSongs.filter(
    (list) => list?.userId == loggedInUser
  );

  useEffect(() => {
    dispatch(getLikedSongs());
  }, [loggedInUser]);

  if (filteredLikedSongs?.length === 0) {
    return (
      <Container>
        <div className="flex items-center justify-center h-full py-80 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white-900 mb-4">
              No Liked Songs Found
            </h2>
            <p className="text-lg text-white-700">
              You haven't liked any songs yet.
            </p>
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
        // items={likedSongs}
      />
    </Container>
  );
}

export default Liked;
