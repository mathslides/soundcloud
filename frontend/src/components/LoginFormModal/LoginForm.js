

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeLogin } from "../../store/modal";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom";
import toast, { Toaster } from "react-hot-toast";


export default function LoginFormPage({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) {
  //   history.push("/dashboard");
  //   return null;
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const result = await dispatch(sessionActions.login({ credential, password }));

      if (result) {
        toast.success('You have logged in successfully!', {
          duration: 2000,
          position: 'top-right',
        });
        history.push("/dashboard");

      } else {
        toast.error('Failed to login. Please try again.', {
          duration: 5000,
          position: 'top-right',
        });
      }
    }
    catch (res) {
      const data = await res?.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        console.error('Unexpected error:', res);
        toast.error('An error occurred. Please try again.', {
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };





  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="flex  items-center justify-center h-full pt-36">
      <div className="bg-white rounded-2xl shadow-md p-8 w-1/3">
        <h2 className="text-3xl font-bold  text-center">Welcome back!</h2>
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 items-center">

          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Email or username"
            className="bg-gray-100 text-white  rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-100 text-white  rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 mt-2 hover:text-gray-800"
          >
            Back
          </button>
        </form>
        <div className="flex justify-center tems-center pt-2">
          <Link to="/register" className="text-blue-500 mt-2 hover:text-blue-800">
            Create an account
          </Link>
        </div>

        {errors.length > 0 && (
          <ul className="text-red-500 mt-4">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
