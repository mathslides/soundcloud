import { csrfFetch } from "./csrf";
import { BASEURL } from "../constants";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/server/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token); // Store the token in localStorage
    dispatch(setUser(data.user));
  }
  return res;
};



export const restoreUser = () => async (dispatch) => {

  const res = await csrfFetch("/server/api/session");
  // const res = await csrfFetch(`${BASEURL}/server/api/session/login`);
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};
// export const restoreUser = () => async (dispatch) => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   const res = await csrfFetch("/server/api/session", {
//     headers: {
//       Authorization: token,
//     },
//   });
//   const data = await res.json();
//   if (res.ok) {
//     dispatch(setUser(data.user));
//   }
//   return res;
// };

export const signup = (user) => async (dispatch) => {
  const { username, email, password, verificationCode } = user;
  const res = await csrfFetch("/server/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      verificationCode,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  }
  return res;
};

export const logout = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await csrfFetch("/server/api/session/logout", {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
  if (res.ok) {
    localStorage.removeItem("token");
    dispatch(removeUser());
  }
  return res;
};

const sessionReducer = (state = { user: null }, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = { ...state, user: action.user };
      return newState;
    case REMOVE_USER:
      newState = { ...state, user: null };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

