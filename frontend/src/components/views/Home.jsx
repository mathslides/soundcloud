import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingSongs } from "../../store/songs";
import Container from "../Container";
import Section from "../Section";

function Home() {
  const dispatch = useDispatch();
  const trendingSongs = useSelector(
    (state) => state.songs?.trendingSongs?.trendSongs
  );
  const [loader, setLoader] = useState(false);
  // const [trending, setTrending] = useState("");
  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      setLoader(true);
      const response = await dispatch(getTrendingSongs());
      setLoader(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  if (loader) {
    return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {Array(15)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 mb-2"></div>
                  <div className="h-4 bg-gray-700 w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    );
  }

  if (trendingSongs?.length === 0) {
    return (
      <Container>
        <div className="flex items-center justify-center h-full py-80 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white-900 mb-4">
              No Songs Found
            </h2>
            <p className="text-lg text-white-700">
              You haven't added any songs yet.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Section title="All Songs" more="/blabla" items={trendingSongs} />
    </Container>
  );
}

export default Home;
