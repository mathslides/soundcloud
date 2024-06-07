
import { BASEURL } from "../constants";
import { csrfFetch } from "./csrf";

const ADD_SONG_TO_PLAYLIST = "playlistSongs/addSongToPlaylist";
const GET_SONGS_IN_PLAYLIST = "playlistSongs/getSongsInPlaylist";

// Action creators
const addSongToPlaylistSuccess = (playlistSongs) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlistSongs,
});

const getSongsInPlaylistSuccess = (songs) => ({
    type: GET_SONGS_IN_PLAYLIST,
    songs,
});

// Thunk actions
export const addToPlaylistSongs = (playlistId, songId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/playlistSongs/add-song-to-playlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playlistId, songId }),
        });
        const data = await response.json();
        dispatch(getSongsInPlaylist(playlistId)); // Pass the playlistId
        dispatch(addSongToPlaylistSuccess(data));
        return data;
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        throw error;
    }
};

export const getSongsInPlaylist = (playlistId) => async (dispatch) => {
    try {
        const response = await fetch(`${BASEURL}/server/api/playlistSongs/getAllPlaylistSongs?playlistId=${playlistId}`);
        const data = await response.json();
        dispatch(getSongsInPlaylistSuccess(data));
    } catch (error) {
        console.error("Error getting songs in playlist:", error);
        throw error;
    }
};

// Reducer
const initialState = { playlistSongs: [] };

const playlistSongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SONG_TO_PLAYLIST:
            return {
                ...state,
                playlistSongs: [...state.playlistSongs, action.playlistSongs],
            };
        case GET_SONGS_IN_PLAYLIST:
            return {
                ...state,
                playlistSongs: action.songs,
            };
        default:
            return state;
    }
};

export default playlistSongsReducer;
