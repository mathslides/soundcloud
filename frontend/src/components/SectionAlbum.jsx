// SectionAlbum.js

import React from "react";

function SectionAlbum({ title, songs }) {
    return (
        <div className="album-card mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Albums</h3>
            <div className="songs-list">
                {songs && songs.length > 0 ? (
                    songs.map((song) => (
                        <div key={song.id} className="song-item mb-4 p-4 bg-gray-700 rounded-lg shadow-sm">
                            <h4 className="text-lg font-bold text-white">{song.title}</h4>
                            <p className="text-gray-400">{song.genre}</p>
                            <audio controls className="mt-2">
                                <source src={song.audioFile} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300">No songs available</p>
                )}
            </div>
        </div>
    );
}

export default SectionAlbum;
