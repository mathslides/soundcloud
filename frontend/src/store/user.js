import { BASEURL } from "../constants";
import { csrfFetch } from "./csrf";

// Action types
const GET_ALL_USERS = "users/getAllUsers";
const GET_ONE_USER = "users/getOneUser";
const UPDATE_USER = "users/updateUser";
const DELETE_USER = "users/deleteUser";

// Action creators
const getUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users,
    };
};

const getOneUser = (user) => {
    return {
        type: GET_ONE_USER,
        user,
    };
};

const updateUserSuccess = (user) => {
    return {
        type: UPDATE_USER,
        user,
    };
};

const deleteUserSuccess = (id) => {
    return {
        type: DELETE_USER,
        id,
    };
};

// Thunks
export const getAllUsers = () => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/users/getAllUsers`);
        const data = await res.json();
        dispatch(getUsers(data));
        return res;
    } catch (error) {
        // Handle error
    }
};

export const getCurrentUser = (id) => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/users/getOne/${id}`);
        const data = await res.json();
        dispatch(getOneUser(data));
        return res;
    } catch (error) {
        // Handle error
    }
};

export const updateUser = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${BASEURL}/server/api/users/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        dispatch(updateUserSuccess(data));
        return res;
    } catch (error) {
        // Handle error
    }
};



export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await csrfFetch(`${BASEURL}/server/api/users/delete/${id}`, {
            method: "DELETE",
        });
        dispatch(deleteUserSuccess(id));
        return res;
    } catch (error) {
        // Handle error
    }
};

// Reducer
const initialState = { users: null, currentUser: null };

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USERS:
            newState = { ...state, users: action.users };
            return newState;
        case GET_ONE_USER:
            newState = { ...state, currentUser: action.user };
            return newState;
        case UPDATE_USER:
            newState = {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.user.id) {
                        return action.user;
                    }
                    return user;
                }),
                currentUser: action.user.id === state.currentUser?.id ? action.user : state.currentUser,
            };
            return newState;
        case DELETE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user.id !== action.id),
                currentUser: action.id === state.currentUser?.id ? null : state.currentUser,
            };
            return newState;
        default:
            return state;
    }
};

export default usersReducer;
