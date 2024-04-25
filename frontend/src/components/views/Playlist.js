// // import React from "react";
// // import { useSelector } from "react-redux";
// // import Container from "../Container";
// // import Section from "../Section";

// // function Playlists() {
// //     const playlistSongs = useSelector((state) => state.playlists.playlists);

// //     if (!playlistSongs) {
// //         return <div>Loading...</div>;
// //     }

// //     if (playlistSongs.length === 0) {
// //         return <div>No playlists found.</div>;
// //     }

// //     return (
// //         <Container>
// //             {/* <Section title="Playlists"> */}
// //             {playlistSongs.map((playlist) => (
// //                 <div
// //                     key={playlist?.id}
// //                     className="bg-gray-900 rounded-lg p-4 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
// //                 >
// //                     <h3 className="text-white font-semibold">{playlist?.name}</h3>
// //                     <p className="text-gray-400">Id: {playlist?.id}</p>
// //                 </div>
// //             ))}
// //             {/* </Section> */}
// //         </Container>
// //     );
// // }

// // export default Playlists;


// import React from "react";
// import { useSelector } from "react-redux";
// import Container from "../Container";
// import Section from "../Section";
// import SectionPlaylist from "../SectionPlaylist";

// function Playlists() {
//     const playlistSongs = useSelector((state) => state.playlists.playlists);

//     console.log("playlistSongs", playlistSongs);
//     if (!playlistSongs) {
//         return <div>Loading...</div>;
//     }

//     if (playlistSongs.length === 0) {
//         return <div>No playlists found.</div>;
//     }

//     return (
//         <Container>
//             <SectionPlaylist
//                 title="My Favourite"
//                 more="/blabla"
//                 items={playlistSongs}
//             />
//         </Container>
//     );
// }

// export default Playlists;


import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import SectionPlaylist from "../SectionPlaylist";

function Playlists() {
    const playlistSongs = useSelector((state) => state.playlists.playlists);

    if (!playlistSongs) {
        return <div>Loading...</div>;
    }

    if (playlistSongs.length === 0) {
        return <div>No playlists found.</div>;
    }

    return (
        <Container>
            {playlistSongs.map((playlist) => (
                <SectionPlaylist
                    key={playlist.id}
                    title={playlist.name}
                    more={`/playlist/${playlist.id}`} // Example link, replace with actual link
                    items={[playlist]} // Pass the playlist as an array since SectionPlaylist expects an array
                />
            ))}
        </Container>
    );
}

export default Playlists;
