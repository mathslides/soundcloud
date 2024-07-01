
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../Container";
import { editUser, getCurrentUser } from "../../../store/user";
import toast, { Toaster } from "react-hot-toast";

function EditProfile() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.session.user);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        type: "",
        status: "",
    });

    useEffect(() => {
        if (loggedInUser) {
            setUserData({
                username: loggedInUser.username,
                email: loggedInUser.email,
                type: loggedInUser.type,
                status: loggedInUser.status,
            });
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (dispatch && loggedInUser) {
            getOne(loggedInUser.id);
        }
    }, [dispatch, loggedInUser]);

    const getOne = async (userId) => {
        try {
            const response = await dispatch(getCurrentUser(userId));
            setUserData(response);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(editUser({ id: loggedInUser.id, ...userData }));
            if (response) {
                toast.success('Profile updated successfully!', {
                    duration: 3000,
                    position: 'top-right',
                });
            } else {
                toast.error('Failed to update profile. Please try again.', {
                    duration: 3000,
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.', {
                duration: 3000,
                position: 'top-right',
            });
        }
    };

    return (
        <Container>
            <div
                className="bg-gray-800 text-white rounded-lg shadow-lg w-full mx-auto overflow-hidden p-4 md:p-6 lg:p-8 xl:p-10 mb-20"
            >
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/*... (rest of the form fields remain the same) */}
                    <div className="mb-4 md:mb-6">
                        <label className="block text-gray-400">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label className="block text-gray-400">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label className="block text-gray-400">Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={userData.type}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label className="block text-gray-400">Status:</label>
                        <input
                            type="text"
                            name="status"
                            value={userData.status}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end mt-4 md:mt-6 xl:mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </Container>
    );
}

export default EditProfile;