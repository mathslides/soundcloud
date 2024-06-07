import { csrfFetch } from "./csrf";

// Action Types
const ADD_LIKED_SONG = "liked/addLikedSong";
const GET_LIKED_SONGS = "liked/getLikedSongs";
const DELETE_LIKED_SONG = "liked/deleteLikedSong";
const UPDATE_LIKED_SONG = "liked/updateLikedSong";

// Action Creators
const addLikedSongSuccess = (payload) => ({
    type: ADD_LIKED_SONG,
    payload,
});

const getLikedSongsSuccess = (payload) => ({
    type: GET_LIKED_SONGS,
    payload,
});

const deleteLikedSongSuccess = (payload) => ({
    type: DELETE_LIKED_SONG,
    payload,
});

const updateLikedSongSuccess = (payload) => ({
    type: UPDATE_LIKED_SONG,
    payload,
});

// Thunk Actions
export const addLikedSong = (songId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/likedSongs/add-liked-song`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ songId }),
        });
        const data = await response.json();
        dispatch(addLikedSongSuccess(data));
        return data;
    } catch (error) {
        console.error("Error adding liked song:", error);
        throw error;
    }
};

export const getLikedSongs = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/likedSongs/get-all-liked-songs`);
        const data = await response.json();
        dispatch(getLikedSongsSuccess(data));
        return data; // Optionally return data from the response

    } catch (error) {
        console.error("Error getting liked songs:", error);
        throw error;
    }
};

export const deleteLikedSong = (songId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/likedSongs/delete-liked-song/${songId}`);
        const data = await response.json();
        dispatch(deleteLikedSongSuccess(songId));
        return data; // Optionally return data from the response
    } catch (error) {
        console.error('Error deleting liked song:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

export const updateLikedSong = (likedSongId, updatedFields) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/likedSongs/update-liked-song/${likedSongId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });
        const data = await response.json();
        dispatch(updateLikedSongSuccess(data.likedSong));
        return data;
    } catch (error) {
        console.error("Error updating liked song:", error);
        throw error;
    }
};


// Reducer
const initialState = { likedSongs: [] };

const likedReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKED_SONGS:
            return {
                ...state,
                likedSongs: action.payload,
            };
        case ADD_LIKED_SONG:
            return {
                ...state,
                likedSongs: [...state.likedSongs, action.payload],
            };
        case DELETE_LIKED_SONG:
            return {
                ...state,
                likedSongs: state.likedSongs.filter((likedSong) => likedSong?.songId !== action.payload),
            };

        case UPDATE_LIKED_SONG:
            return {
                ...state,
                likedSongs: state.likedSongs.map((likedSong) =>
                    likedSong.id === action.payload.id ? action.payload : likedSong
                ),
            };
        default:
            return state;
    }
};

export default likedReducer;
