import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function LoginFormPage({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true); // Start loading spinner
    try {
      const result = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (result) {
        toast.success("You have logged in successfully!", {
          duration: 2000,
          position: "top-right",
        });
        history.push("/dashboard");
      } else {
        toast.error("Failed to login. Please try again.", {
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (res) {
      const data = await res?.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        console.error("Unexpected error:", res);
        toast.error("An error occurred. Please try again.", {
          duration: 5000,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false); // Stop loading spinner
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1.5 items-center"
        >
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Email or username"
            className="bg-gray-100 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-100 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="block w-full  text-white py-2 px-4 rounded-md  bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2  focus:ring-opacity-50"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto text-white h-5 w-5" /> // Show spinner if loading
            ) : (
              "Log In"
            )}
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
          <Link
            to="/register"
            className="text-blue-500 mt-2 hover:text-blue-800"
          >
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
      <Toaster />
    </div>
  );
}
