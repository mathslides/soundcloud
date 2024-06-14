// // frontend/src/components/Navigation/ProfileButton.js
// import React from "react";
// import Container from "../../Container";
// import { useSelector } from "react-redux";

// function ProfileButton() {
//   const loggedInUser = useSelector((state) => state.session.user);
//   const {
//     username,
//     email,
//     type,
//     status,
//     createdAt,
//     updatedAt
//   } = loggedInUser || {};

//   const user = {
//     name: 'Tayfun Erbilen',
//     avatar: 'https://i.scdn.co/image/ab6775700000ee856fca122911ed9eec4ce60c1e',
//   };

//   return (
//     <Container>
//       <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full  mx-auto overflow-hidden">
//         <div className="bg-gray-400 p-8 flex flex-col items-center">
//           <img
//             src={user.avatar}
//             alt="Avatar"
//             className="rounded-full mb-4 w-32 h-32 border-4 border-white"
//           />
//           <h1 className="text-4xl font-extrabold">{username}</h1>
//         </div>
//         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="text-lg">
//             <strong className="block text-gray-400">Email:</strong>
//             <span className="block mt-1 text-xl font-semibold text-white">{email}</span>
//           </div>
//           <div className="text-lg">
//             <strong className="block text-gray-400">Type:</strong>
//             <span className="block mt-1 text-xl font-semibold text-white">{type}</span>
//           </div>
//           <div className="text-lg">
//             <strong className="block text-gray-400">Status:</strong>
//             <span className="block mt-1 text-xl font-semibold text-white">{status}</span>
//           </div>
//           <div className="text-lg">
//             <strong className="block text-gray-400">Created At:</strong>
//             <span className="block mt-1 text-xl font-semibold text-white">{new Date(createdAt).toLocaleDateString()}</span>
//           </div>

//         </div>
//       </div>
//     </Container>
//   );
// }

// export default ProfileButton;


// frontend/src/components/Navigation/ProfileButton.js
import React from "react";
import Container from "../../Container";
import { useSelector } from "react-redux";

function ProfileButton() {
  const loggedInUser = useSelector((state) => state.session.user);
  const {
    username,
    email,
    type,
    status,
    createdAt,
    updatedAt
  } = loggedInUser || {};

  // Generate an avatar from the first two letters of the username
  const generateAvatar = (name) => {
    const initials = name ? name.slice(0, 2).toUpperCase() : "NA";
    return (
      <div className="bg-blue-500 text-white w-32 h-32 flex items-center justify-center rounded-full mb-4 text-4xl font-bold">
        {initials}
      </div>
    );
  };

  return (
    <Container>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full mx-auto overflow-hidden">
        <div className="bg-gray-600 p-8 flex flex-col items-center">
          {generateAvatar(username)}
          <h1 className="text-4xl font-extrabold">{username}</h1>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </Container>
  );
}

export default ProfileButton;
