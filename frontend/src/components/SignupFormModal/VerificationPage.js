// VerificationFormPage.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../store/emailVerification";
import * as sessionActions from "../../store/session";
import { Link, Redirect, useHistory } from "react-router-dom";

function VerificationFormPage({ data }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [verificationCode, setVerificationCodeLocal] = useState("");
    const [error, setError] = useState(null);


    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            await dispatch(sessionActions.signup({ ...data, verificationCode }));
            history.push("/dashboard");
        } catch (error) {
            console.error('Error signing up:', error.message);
            setError(["Verification code is incorrect or expired."]);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-2xl p-8 w-1/3">
                <h2 className="text-3xl font-bold mb-6 text-center text-black">Email Verification</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCodeLocal(e.target.value)}
                            placeholder="Verification Code"
                            className="block w-full bg-gray-100 text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Verify
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
}

export default VerificationFormPage;
