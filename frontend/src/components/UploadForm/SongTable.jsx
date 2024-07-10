// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTrendingSongs } from "../../store/songs";
// import ReactTable from "react-table-6";
// import "react-table-6/react-table.css";

// const SongTable = () => {
//   const [songs, setSongs] = useState([]);
//   const loggedInUser = useSelector((state) => state.session.user.id);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (loggedInUser) {
//       fetchUserSongs();
//     }
//   }, [loggedInUser]);

//   const fetchUserSongs = async () => {
//     try {
//       const response = await dispatch(getTrendingSongs());
//       setSongs(response.trendSongs);
//     } catch (error) {
//       console.error("Error fetching user songs:", error);
//     }
//   };

//   //   const filteredSongs = songs?.filter((song) => song.userId === loggedInUser);

//   //   useEffect(() => {
//   //     const filteredSongs = songs?.filter((song) => song.userId === loggedInUser);
//   //   }, [songs, loggedInUser]);

//   const columns = [
//     {
//       Header: "Title",
//       accessor: "title",
//       style: {
//         color: "white",
//       },
//     },
//     {
//       Header: "Artist",
//       accessor: "artist",
//       style: {
//         color: "white",
//       },
//     },
//     {
//       Header: "Genre",
//       accessor: "genre",
//       style: {
//         color: "white",
//       },
//     },
//     {
//       Header: "Album",
//       accessor: "albumName",
//       style: {
//         color: "white",
//       },
//     },
//   ];

//   return (
//     <div className="w-full">
//       <h2 className="text-2xl font-bold mb-4 text-white">
//         Your Uploaded Songs
//       </h2>
//       <ReactTable
//         data={filteredSongs}
//         columns={columns}
//         defaultPageSize={10}
//         showPageSizeOptions={true}
//         minRows={0}
//         getTheadThProps={() => {
//           return {
//             style: {
//               backgroundColor: "#333",
//               color: "white",
//               padding: "10px",
//               textAlign: "left",
//             },
//           };
//         }}
//         getTheadTrProps={() => {
//           return {
//             style: {
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//             },
//           };
//         }}
//         getTrProps={(state, rowInfo, column) => {
//           return {
//             style: {
//               backgroundColor:
//                 rowInfo && rowInfo.row && rowInfo.row.index % 2 === 0
//                   ? "rgba(255, 255, 255, 0.1)"
//                   : "rgba(255, 255, 255, 0.05)",
//               color: "white",
//               padding: "10px",
//             },
//           };
//         }}
//       />
//     </div>
//   );
// };

// export default SongTable;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingSongs } from "../../store/songs";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { FaSpinner } from "react-icons/fa";

const SongTable = () => {
  const [songs, setSongs] = useState([]);
  const [loader, setLoader] = useState(false); // Add loader state
  const loggedInUser = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) {
      fetchUserSongs();
    }
  }, [loggedInUser]);

  const fetchUserSongs = async () => {
    try {
      setLoader(true); // Set loader to true before fetching songs
      const response = await dispatch(getTrendingSongs());
      setSongs(response.trendSongs);
      setLoader(false); // Set loader to false after fetching songs
    } catch (error) {
      console.error("Error fetching user songs:", error);
      setLoader(false); // Set loader to false in case of an error
    }
  };

  const filteredSongs = songs?.filter((song) => song.userId === loggedInUser);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      style: {
        color: "white",
      },
    },
    {
      Header: "Artist",
      accessor: "artist",
      style: {
        color: "white",
      },
    },
    {
      Header: "Genre",
      accessor: "genre",
      style: {
        color: "white",
      },
    },
    {
      Header: "Album",
      accessor: "albumName",
      style: {
        color: "white",
      },
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Your Uploaded Songs
      </h2>
      {loader ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-white h-12 w-12" />
        </div>
      ) : (
        <ReactTable
          data={filteredSongs}
          columns={columns}
          defaultPageSize={10}
          showPageSizeOptions={true}
          minRows={0}
          getTheadThProps={() => {
            return {
              style: {
                backgroundColor: "#333",
                color: "white",
                padding: "10px",
                textAlign: "left",
              },
            };
          }}
          getTheadTrProps={() => {
            return {
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            };
          }}
          getTrProps={(state, rowInfo, column) => {
            return {
              style: {
                backgroundColor:
                  rowInfo && rowInfo.row && rowInfo.row.index % 2 === 0
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.05)",
                color: "white",
                padding: "10px",
              },
            };
          }}
        />
      )}
    </div>
  );
};

export default SongTable;
