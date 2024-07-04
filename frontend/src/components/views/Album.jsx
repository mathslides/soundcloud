import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import SectionAlbum from "../SectionAlbum";
import { getTrendingSongs } from "../../store/songs";

function Albums() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const albums = useSelector((state) => state.songs?.trendingSongs?.trendSongs);

  useEffect(() => {
    dispatch(getTrendingSongs())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <div className="album-card mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-white">Albums</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(15)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="song-item bg-gray-700 rounded-lg shadow-sm p-4 animate-pulse flex flex-col justify-between"
                >
                  <div>
                    <div className="h-4 bg-gray-600 mb-2"></div>
                    <div className="h-4 bg-gray-600 mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-600 w-1/2"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <Container>
        <div className="flex items-center justify-center h-full py-80 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              No Albums Found
            </h2>
            <p className="text-lg text-gray-700">
              There are no albums available.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SectionAlbum title="Trending Albums" songs={albums} />
    </Container>
  );
}

export default Albums;
