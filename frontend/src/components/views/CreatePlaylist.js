
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import Section from "../Section";
import Modal from "react-responsive-modal";
import { createPlaylist } from "../../store/playlist";
import toast, { Toaster } from "react-hot-toast";

function CreatePlaylist() {
    const dispatch = useDispatch();
    const databaseSongs = useSelector((state) => state.songs.songs);
    const playlistSongs = useSelector(state => state.playlistSongs.playlistSongs);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [showModal, setShowModal] = useState(true); // Set initial state to true
    const [error, setError] = useState("");
    const { session } = useSelector(state => state);
    const userId = session?.user?.id;

    const handleCreatePlaylist = async () => {
        try {
            if (!newPlaylistName) {
                setError("Please enter a playlist name.");
                return;
            }
            // const songId = ;

            const payload = {
                userId,
                name: newPlaylistName,
                // songId,
            };

            const result = await dispatch(createPlaylist(payload));
            console.log("result handleCreatePlaylist", result);

            if (result) {
                toast.success('Playlist has been created!', {
                    duration: 3000,
                    position: 'top-right',
                });
                setNewPlaylistName("");
                setShowModal(false);
                setError("");
            }
        } catch (error) {
            console.error("Failed to add song to playlist:", error);
            setError("Failed to add song to playlist. Please try again.");
        }
    }

    return (
        <Container>
            {/* Modal for adding to playlist */}
            <Modal
                className="w-3/6"
                open={showModal} // Set open prop to showModal
                onClose={() => setShowModal(false)} center classNames={{
                    modal: 'custom-modal',
                    closeButton: 'custom-closeButton',
                }}>
                <div className="bg-gray-900 p-8 rounded-lg w-96">
                    <h3 className="text-lg font-semibold text-white mb-4">Add to Playlist</h3>
                    <div className="mt-4">
                        <h2 className="text-white font-semibold">Create New Playlist</h2>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Playlist Name"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                className="border border-gray-700 px-3 py-1 rounded-lg w-full mt-2 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleCreatePlaylist}
                                className="bg-green-500 text-white px-4 py-1 ml-2 rounded-lg"
                            >
                                Create
                            </button>
                        </div>
                        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                    </div>
                    <button
                        onClick={() => setShowModal(false)} // Close modal on click
                        className="bg-red-500 text-white px-4 py-1 rounded-lg mt-4"
                    >
                        Close
                    </button>
                </div>
            </Modal>
            <Toaster />

        </Container>

    );
}

export default CreatePlaylist;

