import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "../../Container";
import { getCurrentUser } from "../../../store/user";

function ProfileButton() {
  const loggedInUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch();

  const profile = "/assets/dummyProfile.png";

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    type: "",
    status: "",
    imgUrl: "",
    createdAt: "",
  });

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
  const handleEditProfile = () => {
    history.push("/edit-profile");
  };

  return (
    <Container>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full mx-auto overflow-hidden relative">
        <div className="bg-gray-600 p-4 md:p-8 flex flex-col items-center">
          {userData?.imgUrl ? (
            <img
              src={userData?.imgUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover mx-auto"
            />
          ) : (
            <img
              src={profile}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover mx-auto"
            />
            // <div className="h-32 w-32 rounded-full bg-gray-700 mx-auto flex items-center justify-center">
            //   <span className="text-gray-400">No Image</span>
            // </div>
          )}{" "}
          <h1 className="text-2xl md:text-4xl font-extrabold mt-4">
            {userData?.username}
          </h1>
          <button
            onClick={handleEditProfile}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
        <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-lg">
            <strong className="block text-gray-400">Email:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">
              {userData?.email}
            </span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Type:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">
              {userData?.type}
            </span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Status:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">
              {userData?.status}
            </span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Created At:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">
              {new Date(userData?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Bottom padding to accommodate the music player bar */}
        <div className="h-20 md:h-10"></div>
      </div>
    </Container>
  );
}

export default ProfileButton;
