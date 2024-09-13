import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container";
import { createPlaylist } from "../../store/playlist";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

function CreatePlaylist() {
    const dispatch = useDispatch();
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [error, setError] = useState("");
    const { session } = useSelector(state => state);
    const userId = session?.user?.id;
    const [loading, setLoading] = useState(false);

    const handleCreatePlaylist = async () => {
        try {
            if (!newPlaylistName) {
                setError("Please enter a playlist name.");
                return;
            }
            setLoading(true);
            const payload = {
                userId,
                name: newPlaylistName,
            };

            const result = await dispatch(createPlaylist(payload));
            if (result) {
                toast.success('Playlist has been created!', {
                    duration: 3000,
                    position: 'top-right',
                });
                setNewPlaylistName("");
                setLoading(false);
                setError("");
            }
        } catch (error) {
            setLoading(false);
            console.error("Failed to add song to playlist:", error);
            setError("Failed to add song to playlist. Please try again.");
        }
    }

    return (
        <Container>
            <div className="bg-gray-700 p-8 rounded-lg w-2/4 mx-auto mt-24">
                <h2 className="text-white font-semibold text-center">Create New Playlist</h2>
                <div className="mt-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            className="border border-gray-700 px-3 py-1 rounded-lg w-full mt-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="flex justify-end mt-4">
                        {loading ? (
                            <div className="flex items-center">
                                <FaSpinner className="animate-spin text-white h-6 w-6" />
                                <span className="ml-2 text-white">Creating...</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleCreatePlaylist}
                                disabled={loading}
                                className="bg-green-500 text-white px-4 py-1 rounded-lg"
                            >
                                Create
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </Container>
    );
}

export default CreatePlaylist;
