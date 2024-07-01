import { BASEURL } from "../constants";
import { csrfFetch } from "./csrf";

// Action types
export const GET_ALL_GENRES = "genres/getAllGenres";
export const GET_ONE_GENRE = "genres/getOneGenre";
export const GET_TRENDING_GENRES = "genres/getTrendingGenres";
export const POST_GENRE = "genres/postGenre";

// Action creators
export const getAllGenresAction = (genres) => ({
    type: GET_ALL_GENRES,
    genres,
});

export const getOneGenreAction = (genre) => ({
    type: GET_ONE_GENRE,
    genre,
});

export const getTrendingGenresAction = (genres) => ({
    type: GET_TRENDING_GENRES,
    genres,
});

export const postGenre = (genreData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${BASEURL}/server/api/genres/create-genre`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(genreData),
        });
        const data = await response.json();
        // Dispatch action to update state after successful post
        dispatch(getAllGenres()); // Assuming you want to refresh the genres list after adding a new genre
        return data;
    } catch (error) {
        console.error('Failed to post genre:', error);
        throw error;
    }
};

export const getAllGenres = () => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/songs/getAllGenres`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        dispatch(getAllGenresAction(data));
        return data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

export const getOneGenre = (id) => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/genres/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        dispatch(getOneGenreAction(data));
        return data;
    } catch (error) {
        console.error(`Error fetching genre with ID ${id}:`, error);
        throw error;
    }
};

export const getTrendingGenres = () => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/genres/trend`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        dispatch(getTrendingGenresAction(data));
        return data;
    } catch (error) {
        console.error('Error fetching trending genres:', error);
        throw error;
    }
};
// Initial state
const initialState = {
    genres: null,
    trendingGenres: null,
    currentGenre: null,
};


// Reducer function
const genresReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GENRES:
            newState = { ...state, genres: action.genres };
            return newState;
        case GET_ONE_GENRE:
            newState = { ...state, currentGenre: action.genre };
            return newState;
        case GET_TRENDING_GENRES:
            newState = { ...state, trendingGenres: action.genres };
            return newState;
        default:
            return state;
    }
};

export default genresReducer;
