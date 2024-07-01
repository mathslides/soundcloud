
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "../../Container";

function ProfileButton() {
  const loggedInUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const {
    username,
    email,
    type,
    status,
    createdAt,
    updatedAt
  } = loggedInUser || {};

  const generateAvatar = (name) => {
    const initials = name ? name.slice(0, 2).toUpperCase() : "NA";
    return (
      <div className="bg-blue-500 text-white w-32 h-32 flex items-center justify-center rounded-full mb-4 text-4xl font-bold">
        {initials}
      </div>
    );
  };

  const handleEditProfile = () => {
    history.push("/edit-profile");
  };

  return (
    <Container>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full mx-auto overflow-hidden relative">
        <div className="bg-gray-600 p-4 md:p-8 flex flex-col items-center">
          {generateAvatar(username)}
          <h1 className="text-2xl md:text-4xl font-extrabold mt-4">{username}</h1>
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
            <span className="block mt-1 text-xl font-semibold text-white">{email}</span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Type:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">{type}</span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Status:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">{status}</span>
          </div>
          <div className="text-lg">
            <strong className="block text-gray-400">Created At:</strong>
            <span className="block mt-1 text-xl font-semibold text-white">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {/* Bottom padding to accommodate the music player bar */}
        <div className="h-20 md:h-10"></div>
      </div>
    </Container>
  );
}

export default ProfileButton;
