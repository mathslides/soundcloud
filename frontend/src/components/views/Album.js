// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Container from "../Container";
// import LoaderSpinner from "../Spinner";
// import SectionAlbum from "../SectionAlbum";
// import { getAllSongs } from "../../store/songs";

// function Albums() {
//     const dispatch = useDispatch();
//     const albums = useSelector((state) => state.songs.songs);
//     useEffect(() => {
//         dispatch(getAllSongs());
//     }, [dispatch]);

//     if (!albums) {
//         return <LoaderSpinner />;
//     }

//     if (albums.length === 0) {
//         return (
//             <Container>
//                 <div className="flex items-center justify-center h-full py-80 text-white">
//                     <div className="text-center">
//                         <h2 className="text-3xl font-bold text-white mb-4">No Album Found</h2>
//                         <p className="text-lg text-gray-700">You haven't added any albums yet.</p>
//                     </div>
//                 </div>
//             </Container>
//         );
//     }

//     return (
//         <Container>
//             {/* {albums.map((album) => ( */}
//             <SectionAlbum
//                 // key={album?.id}
//                 // title={album?.name}
//                 songs={albums}
//             />
//             {/* ))} */}
//         </Container>
//     );
// }

// export default Albums;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import LoaderSpinner from "../Spinner";
import SectionAlbum from "../SectionAlbum";
import { getAllSongs } from "../../store/songs";

function Albums() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const albums = useSelector((state) => state.songs.songs);

    useEffect(() => {
        dispatch(getAllSongs())
            .then(() => setLoading(false))
            .catch(() => setLoading(false)); // Handle any fetch errors here
    }, [dispatch]);

    if (loading) {
        return <LoaderSpinner />;
    }

    if (!albums || albums.length === 0) {
        return (
            <Container>
                <div className="flex items-center justify-center h-full py-80 text-white">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">No Albums Found</h2>
                        <p className="text-lg text-gray-700">There are no albums available.</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <SectionAlbum songs={albums} />
        </Container>
    );
}

export default Albums;
