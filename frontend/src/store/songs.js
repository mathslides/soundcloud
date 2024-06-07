import { BASEURL } from "../constants";
import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = "songs/getAllSongs";
const GET_TWELVE_SONGS = "songs/getTwelveSongs";
const GET_ONE_SONG = "songs/getOneSong";

const getSongs = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};
const getTwelveSongs = (songs) => {
  return {
    type: GET_TWELVE_SONGS,
    songs,
  };
};

const getOneSong = (song) => {
  return {
    type: GET_ONE_SONG,
    song,
  };
};

export const postSong = (song) => async (dispatch) => {
  const { title, artist, genre, albumName, imgUrl, audioFile, userId } = song;
  const response = await csrfFetch(`/server/api/songs/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, artist, genre, albumName, imgUrl, audioFile, userId }),
  });
  const data = await response.json();
  dispatch(getAllSongs());
  return data;
};

export const getAllSongs = () => async (dispatch) => {
  const res = await fetch(`${BASEURL}/server/api/songs/getAllSongs`);
  const data = await res.json();
  dispatch(getSongs(data));
  return res;
};

export const getCurrentSong = (id) => async (dispatch) => {
  const res = await fetch(`${BASEURL}/server/api/songs/${id}`);
  const data = await res.json();
  dispatch(getOneSong(data));
  return res;
};

export const getTrendingSongs = () => async (dispatch) => {
  const res = await fetch(`${BASEURL}/server/api/songs/trend`);
  const data = await res.json();
  dispatch(getTwelveSongs(data));
  return res;
};

const initialState = { songs: null, trendingSongs: null, currentSong: null };
const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SONGS:
      newState = Object.assign({}, state, { songs: action.songs });
      return newState;
    case GET_TWELVE_SONGS:
      newState = Object.assign({}, state, { trendingSongs: action.songs });
      return newState;
    case GET_ONE_SONG:
      newState = Object.assign({}, state, { currentSong: action.song });
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
