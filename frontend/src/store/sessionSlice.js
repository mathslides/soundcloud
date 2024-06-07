import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || "", // Get token from localStorage if available
    signedIn: !!localStorage.getItem("token"),
    greeted: false,
};

export const sessionSlice = createSlice({
    name: "auth/session",
    initialState,
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true;
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false;
            state.token = "";
            localStorage.removeItem("token");
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setGreeting: (state, action) => {
            state.greeted = action.payload;
        },
    },
});

export const { onSignInSuccess, onSignOutSuccess, setToken, setGreeting } = sessionSlice.actions;

export default sessionSlice.reducer;
