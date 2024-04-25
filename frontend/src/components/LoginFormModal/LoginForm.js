
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { closeLogin } from "../../store/modal";
// import * as sessionActions from "../../store/session";

// export default function LoginFormPage({ closeModal }) {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) {
//     history.push("/dashboard");
//     return null; // Return null if the user is already logged in
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);
//     try {
//       await dispatch(sessionActions.login({ credential, password }));
//       history.push("/dashboard");
//       closeModal(); // Close modal after successful login
//     } catch (res) {
//       const data = await res.json();
//       if (data && data.errors) setErrors(data.errors);
//     }
//   };

//   const demoSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(sessionActions.demoLogin());
//     history.push("/dashboard");
//     closeModal(); // Close modal after successful demo login
//   };

//   const handleCancel = () => {
//     history.goBack(); // Go back to the previous page in history
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full">
//       <div className="bg-white rounded-lg shadow-md p-8 w-96">
//         <h2 className="text-3xl font-bold mb-6 text-center">Welcome back!</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col items-center">
//           <button
//             type="button" 
//             onClick={demoSubmit}
//             className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full"
//           >
//             Demo Log In
//           </button>
//           <div className="mb-4 text-gray-600">or</div>
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             placeholder="Email address or username"
//             className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full"
//           >
//             Log In
//           </button>
//           <button
//             type="button" // Set type to "button" for cancel button
//             onClick={handleCancel} // Call handleCancel function when cancel button is clicked
//             className="text-gray-500 mt-2 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//         </form>
//         {errors.length > 0 && (
//           <ul className="text-red-500 mt-4">
//             {errors.map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeLogin } from "../../store/modal";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function LoginFormPage({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    history.push("/dashboard");
    return null; // Return null if the user is already logged in
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(sessionActions.login({ credential, password }));
      history.push("/dashboard");
      // closeModal(); // Close modal after successful login
    } catch (res) {
      const data = await res.data.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const demoSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.demoLogin());
    history.push("/dashboard");
    closeModal(); // Close modal after successful demo login
  };

  const handleCancel = () => {
    history.goBack(); // Go back to the previous page in history
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome back!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <button
            type="button"
            onClick={demoSubmit}
            className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Demo Log In
          </button>
          <div className="mb-4 text-gray-600">or</div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Email address or username"
            className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Log In
          </button>
          <button
            type="button" // Set type to "button" for cancel button
            onClick={handleCancel} // Call handleCancel function when cancel button is clicked
            className="text-gray-500 mt-2 hover:text-gray-800"
          >
            Back
          </button>
        </form>
        <Link to="/register" className="text-blue-500 mt-2 hover:text-blue-800">
          Sign Up
        </Link>
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
