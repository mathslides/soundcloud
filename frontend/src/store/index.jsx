import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import modalReducer from "./modal";
import songsReducer from "./songs";
import commentsReducer from "./comments";
import playerReducer from "./player";
import playlistsReducer from "./playlist";
import playlistSongsReducer from "./playlistSongs";
import likedReducer from "./liked";
import emailVerificationReducer from "./emailVerification";
import usersReducer from "./user";
import sessionSlice from "./sessionSlice";
import genresReducer from "./genre";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
  songs: songsReducer,
  comments: commentsReducer,
  player: playerReducer,
  playlists: playlistsReducer,
  playlistSongs: playlistSongsReducer,
  likedSongs: likedReducer,
  emailVerification: emailVerificationReducer,
  users: usersReducer,
  sessionSlice: sessionSlice,
  genresReducer: genresReducer,
});

// Configuration for persisting the redux state
const persistConfig = {
  key: "root",
  storage,
  keyPrefix: "",
  whitelist: ["session", "player", "csrf", "sessionSlice", "genresReducer"],
};

// Create a persisted reducer based on the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancer;

if (process.env.NODE_ENV === "production") {
  // Only apply thunk middleware in production mode
  enhancer = applyMiddleware(thunk);
} else {
  // In development mode, use redux-devtools-extension if available
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk));
}

// Create the Redux store with the persisted reducer and enhancer
const configureStore = (preloadedState) => {
  return createStore(persistedReducer, preloadedState, enhancer);
};

export default configureStore;
