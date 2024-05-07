import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      try {
        await dispatch(sessionActions.signup({ email, username, password }));
        history.push("/dashboard");
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  return (
    <div className="justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center pt-32 bg-black text-white">
        <div className="bg-white rounded-2xl p-8 w-1/3">
          <h2 className="text-3xl whitespace-no-wrap font-bold mb-6 pb-2.5 text-center text-black">Welcome to Calisomnia</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                // className="block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                className="block w-full bg-gray-100 text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block w-full bg-gray-100 text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full bg-gray-100 text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="block w-full bg-gray-100 text-black rounded-md border-gray-300 shadow-sm focus:border-lightseagreen focus:ring focus:ring-lightseagreen focus:ring-opacity-50 px-4 py-2"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center tems-center pt-2">
            <Link to="/login" className="text-blue-500 mt-2 hover:text-blue-800">
              I have an account
            </Link>
          </div>
          <ul className="text-red-500 mt-4">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <Link to="/" className="absolute top-4 left-4 text-black hover:text-lightseagreen">
          Back to Home
        </Link>
        <Link to="/login" className="absolute top-4 right-4 text-black hover:text-lightseagreen">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}

export default SignupFormPage;

