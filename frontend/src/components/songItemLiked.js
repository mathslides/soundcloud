import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import 'react-responsive-modal/styles.css';
import { setCurrent, setPlaying } from "../store/player";
import { getLikedSongs } from "../store/liked";


function SongItemLiked() {
    const dispatch = useDispatch();
    const { current, playing, controls } = useSelector(state => state.player);
    const likedSongs = useSelector(state => state.likedSongs?.likedSongs);
    const loggedInUser = useSelector((state) => state.session?.user?.id);

    const filteredLikedSongs = likedSongs.filter((list) => list?.userId == loggedInUser)


    useEffect(() => {
        dispatch(getLikedSongs());

    }, [dispatch]);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const updateCurrent = (song) => {
        if (!current || current.id !== song?.id) {
            dispatch(setCurrent(song));
            dispatch(setPlaying(true));
        } else {
            if (playing) {
                controls.pause();
                dispatch(setPlaying(false));
            } else {
                controls.play();
                dispatch(setPlaying(true));
            }
        }
    };
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    const handleLike = (event, songId) => {
    };

    return (
        <div className="grid text-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            {filteredLikedSongs?.map((likedSong, index) => (
                <div
                    key={likedSong?.id} // Use a unique identifier as the key prop
                    className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${hoveredIndex === index ? 'hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                >
                    <div>
                        <img
                            src={likedSong?.Song?.imgUrl || ""}
                            alt={likedSong?.Song?.title}
                            className={`w-full h-48 object-cover rounded `}
                        />
                        {hoveredIndex === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-green-600 rounded-full p-2" onClick={(e) => {
                                    e.stopPropagation();
                                    updateCurrent(likedSong?.Song);
                                }}>
                                    {current?.id === likedSong?.Song?.id && playing ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm" />}

                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col">
                                <h6 className="text-white font-semibold mb-1">{likedSong?.Song?.title}</h6>
                                <p className="text-gray-400 text-sm mb-2">{likedSong?.Song?.artist}</p>
                            </div>
                            {/* <div className="flex justify-end">
                                <div style={{ width: "18px", height: "18px" }} onClick={(e) => handleLike(e, likedSong?.Song?.id)}>
                                    <FaRegHeart color="white" size={18} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SongItemLiked;


