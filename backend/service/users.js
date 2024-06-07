
const { User } = require("../db/models");

// Get all users
const getAllUsers = async () => {
    const allUsers = await User.findAll();
    return allUsers;
};

// Get one user by ID
const getOneUser = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

// Create a new user
const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Could not create user");
    }
};

const joinArtist = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Update the user's type to "artist"
        await user.update({ type: "artist" });
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Could not update user");
    }
};
const approveArtist = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Update the user's type to "artist"
        await user.update({ status: "Approved" });
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Could not update user");
    }
};
const rejectArtist = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Update the user's type to "artist"
        await user.update({ status: "Rejected" });
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Could not update user");
    }
};


// Delete a user by ID
const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        await user.destroy();
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Could not delete user");
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    joinArtist,
    deleteUser,
    approveArtist,
    rejectArtist
    
};
