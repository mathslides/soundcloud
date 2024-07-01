import { csrfFetch } from "./csrf";

// Action Types
const VERIFY_EMAIL_SUCCESS = "emailVerification/verifyEmailSuccess";

// Action Creators
const verifyEmailSuccess = () => ({
    type: VERIFY_EMAIL_SUCCESS,
});

// Thunk Actions
export const verifyEmail = (email) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/server/api/emailVerification/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        dispatch(verifyEmailSuccess());
        return data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
};

// Reducer
const initialState = { isEmailVerified: false };

const emailVerificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                isEmailVerified: true,
            };
        default:
            return state;
    }
};

export default emailVerificationReducer;
