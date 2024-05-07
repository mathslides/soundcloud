
import { BASEURL } from "../constants";
import { csrfFetch } from "./csrf";

const CREATE_PLAYLIST = "playlists/createPlaylist";
const GET_PLAYLISTS = "playlists/getPlaylists";
const DELETE_PLAYLIST = "playlists/deletePlaylist";
const UPDATE_PLAYLIST = "playlists/updatePlaylist";

// Action creators
const addSongToPlaylistSuccess = (playlists) => ({
    type: CREATE_PLAYLIST,
    playlists,
});

const getPlaylistsSuccess = (playlist) => ({
    type: GET_PLAYLISTS,
    playlist,
});

const deletePlaylistSuccess = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId,
});

const updatePlaylistSuccess = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist,
});

// Thunk actions
export const createPlaylist = (playlistId, songId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/playlist/create-playlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playlistId, songId }),
        });
        const data = await response.json();
        dispatch(addSongToPlaylistSuccess(data.playlist));
        return data;
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        throw error;
    }
};

export const getPlaylists = () => async (dispatch) => {
    try {
        const response = await fetch(`${BASEURL}/server/api/playlist/getAll`);
        const data = await response.json();
        dispatch(getPlaylistsSuccess(data));
    } catch (error) {
        console.error("Error getting playlists:", error);
        throw error;
    }
};


export const deletePlaylist = (playlistId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/playlists/${playlistId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        dispatch(deletePlaylistSuccess(data.playlistId));
        return data;
    } catch (error) {
        console.error("Error deleting playlist:", error);
        throw error;
    }
};

export const updatePlaylist = (playlistId, updatedFields) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/playlists/${playlistId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });
        const data = await response.json();
        dispatch(updatePlaylistSuccess(data.playlist));
        return data;
    } catch (error) {
        console.error("Error updating playlist:", error);
        throw error;
    }
};

// Reducer
const initialState = { playlists: [] };

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlist,
            };
        case CREATE_PLAYLIST:
            return {
                ...state,
                playlists: [...state.playlists, action.playlist],
            };
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.filter((playlist) => playlist.id !== action.playlistId),
            };
        case UPDATE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.map((playlist) =>
                    playlist.id === action.playlist.id ? action.playlist : playlist
                ),
            };
        default:
            return state;
    }
};

export default playlistsReducer;



// const initialState = { songs: null, trendingSongs: null, currentSong: null };
// const songsReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case GET_ALL_SONGS:
//             newState = Object.assign({}, state, { songs: action.songs });
//             return newState;
//         case GET_TWELVE_SONGS:
//             newState = Object.assign({}, state, { trendingSongs: action.songs });
//             return newState;
//         case GET_ONE_SONG:
//             newState = Object.assign({}, state, { currentSong: action.song });
//             return newState;
//         default:
//             return state;
//     }
// };
