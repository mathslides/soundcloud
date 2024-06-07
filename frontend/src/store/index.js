import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import modalReducer from './modal';
import songsReducer from './songs';
import commentsReducer from './comments';
import playerReducer from './player';
import playlistsReducer from './playlist';
import playlistSongsReducer from './playlistSongs';
import likedReducer from './liked';
import emailVerificationReducer from './emailVerification';
import usersReducer from './user';
import sessionSlice from './sessionSlice';

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


});

const persistConfig = {
  key: 'root',
  storage,
  keyPrefix: "",
  // Optionally, whitelist specific reducers to be persisted
  whitelist: ['session', 'player', 'comments', 'songs', 'csrf', 'playlists', 'playlistSongs', 'likedSongs', 'emailVerification', 'users', 'sessionSlice']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(persistedReducer, preloadedState, enhancer);
};

export default configureStore;
