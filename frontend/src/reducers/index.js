import { combineReducers } from 'redux';
import sessionReducer from '../store/session';
import modalReducer from '../store/modal';
import songsReducer from '../store//songs';
import commentsReducer from '../store/comments';
import playerReducer from '../store//player';

const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
  songs: songsReducer,
  comments: commentsReducer,
  player: playerReducer
});

export default rootReducer;