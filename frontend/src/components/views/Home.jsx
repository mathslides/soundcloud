// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTrendingSongs } from "../../store/songs";
// import Container from "../Container";
// import Section from "../Section";

// function Home() {
//   const dispatch = useDispatch();
//   const [dashboardSong, setDashboardSongs] = useState(false);

//   const trendingSongs = useSelector(
//     (state) => state.songs?.trendingSongs?.trendSongs
//   );
//   const stat = useSelector((state) => state.songs.songs);
//   console.log("stat", stat);
//   console.log("dashboardSong", dashboardSong);

//   const songs = dashboardSong.filter((user)=> user.id).
//   const [loader, setLoader] = useState(false);
//   useEffect(() => {
//     fetchTrending();
//   }, []);

//   const fetchTrending = async () => {
//     try {
//       setLoader(true);
//       const response = await dispatch(getTrendingSongs());
//       setDashboardSongs(response?.trendSongs);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   if (loader) {
//     return (
//       <Container>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
//           {Array(15)
//             .fill()
//             .map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-900 rounded-lg overflow-hidden shadow-md animate-pulse"
//               >
//                 <div className="w-full h-48 bg-gray-700"></div>
//                 <div className="p-4">
//                   <div className="h-4 bg-gray-700 mb-2"></div>
//                   <div className="h-4 bg-gray-700 w-3/4"></div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </Container>
//     );
//   }

//   if (trendingSongs?.length === 0) {
//     return (
//       <Container>
//         <div className="flex items-center justify-center h-full py-80 text-white">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-white-900 mb-4">
//               No Songs Found
//             </h2>
//             <p className="text-lg text-white-700">
//               You haven't added any songs yet.
//             </p>
//           </div>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Section title="All Songs" more="/blabla" items={trendingSongs} />
//     </Container>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingSongs } from "../../store/songs";
import Container from "../Container";
import Section from "../Section";

function Home() {
  const dispatch = useDispatch();
  const [dashboardSong, setDashboardSongs] = useState([]);
  const [loader, setLoader] = useState(false);

  const trendingSongs = useSelector(
    (state) => state.songs?.trendingSongs?.trendSongs
  );

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      setLoader(true);
      const response = await dispatch(getTrendingSongs());
      setDashboardSongs(response?.trendSongs?.slice(0, 15)); // Limit to first 15 songs
      setLoader(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setLoader(false); // Ensure loader is disabled in case of error
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
      <Section title="All Songs" more="/blabla" items={dashboardSong} />{" "}
      {/* Use dashboardSong here */}
    </Container>
  );
}

export default Home;
