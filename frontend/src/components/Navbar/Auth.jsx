// import React, { useState } from "react";
// import { Icon } from "../../Icons";
// import { logout } from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { NavLink } from "react-router-dom/cjs/react-router-dom";

// function Auth() {
//   const userData = useSelector((state) => state.session.user);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout());
//     history.push("/");
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       <button
//         className={`flex items-center focus:outline-none rounded-full px-4 py-3 ${
//           isOpen
//             ? "bg-gray-400 hover:bg-gray-700"
//             : "bg-gray-400 hover:bg-gray-800"
//         }`}
//         onClick={toggleMenu}
//       >
//         <img
//           src={loggedInUser?.imgUrl}
//           className="h-8 w-8 rounded-full object-cover mx-auto"
//           alt="User Avatar"
//         />
//         <span className="text-sm text-white font-semibold mr-2">
//           {loggedInUser?.username}
//         </span>
//         <Icon
//           size={16}
//           name="downDir"
//           className={`transform ${isOpen ? "rotate-180" : ""} text-white`}
//         />
//       </button>
//       {isOpen && (
//         <ul className="absolute top-full right-0 bg-black text-white shadow-md w-48 mt-1">
//           <li className="hover:bg-gray-700 px-4 py-2">
//             <NavLink to={"/profile"}>Profile</NavLink>
//           </li>
//           <li className="hover:bg-gray-700 px-4 py-2">
//             <button onClick={handleLogout}>Log out</button>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Auth;

import React, { useEffect, useState } from "react";
import { Icon } from "../../Icons";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { getCurrentUser } from "../../store/user";

function Auth() {
  const loggedInUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    type: "",
    status: "",
    imgUrl: "",
    createdAt: "",
  });
  const profile = "/assets/dummyProfile.png";

  useEffect(() => {
    if (dispatch && loggedInUser) {
      getOne(loggedInUser?.id);
    }
  }, [dispatch, loggedInUser]);

  const getOne = async (userId) => {
    try {
      const response = await dispatch(getCurrentUser(userId));
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center focus:outline-none rounded-full px-4 py-2 mt-2 transition-colors ${
          isOpen ? "bg-gray-600" : "bg-gray-800"
        } hover:bg-gray-700`}
        onClick={toggleMenu}
      >
        {/* <img
          src={userData?.imgUrl}
          className="h-8 w-8 rounded-full object-cover mr-2"
          alt=""
        /> */}

        {userData?.imgUrl ? (
          <img
            src={userData?.imgUrl}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover mr-2"
          />
        ) : (
          <img
            src={profile}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover mr-2"
          />
        )}
        <span className="text-sm text-white font-semibold mr-2">
          {userData?.username}
        </span>
        <Icon
          size={16}
          name="downDir"
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-white`}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-full right-0 bg-gray-800 text-white shadow-lg rounded-md w-48 z-10">
          <li className="hover:bg-gray-700 px-4 py-2 rounded-t-md">
            <NavLink to="/profile" className="block w-full">
              Profile
            </NavLink>
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded-b-md">
            <button onClick={handleLogout} className="w-full text-left">
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Auth;
