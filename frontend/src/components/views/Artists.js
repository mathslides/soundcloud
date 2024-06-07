import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Container from '../Container';
import { HiOutlinePlusCircle } from "react-icons/hi";
import { getAllUsers, updateUser } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";


function Artists() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddingArtist, setIsAddingArtist] = useState(false);
    const usersState = useSelector(state => state.users);
    const users = Array.isArray(usersState.users) ? usersState.users : [];

    // Include the logged-in user in the selected users list if they are an artist
    const selectedUsers = users.filter(user => user.type === "artist");

    // Check if the loggedInUser is already in selectedUsers
    const isLoggedInUserArtist = selectedUsers.some(user => user.id === loggedInUser?.id);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [loggedInUser, dispatch]);

    useEffect(() => {
        if (selectedUser && selectedUsers.some(user => user.id === selectedUser.id)) {
            setIsAddingArtist(true);
        } else {
            setIsAddingArtist(false);
        }
    }, [selectedUser, selectedUsers]);

    const handleAddArtist = () => {
        setShowModal(true);
    };

    const handleSelectUser = (userId) => {
        setSelectedUser(userId);
    };
    const handleUpdateUser = async () => {
        const result = await dispatch(updateUser(selectedUser));
        if (result && result.status === 200) {
            toast.success('Artist has been added!', {
                duration: 3000,
                position: 'top-right',
            });
        } else {
            toast.error('Failed to add artist. Please try again.', {
                duration: 3000,
                position: 'top-right',
            });
        }
        setShowModal(false);
    };

    const columns = [
        {
            Header: 'Name',
            accessor: 'username',
            style: {
                color: 'white',
            },
        },
        {
            Header: 'Created At',
            accessor: 'createdAt',
            style: {
                color: 'white',
            },
            Cell: ({ value }) => {
                const date = new Date(value);
                const formattedDate = date.toLocaleDateString('en-US');
                return <span style={{ color: 'white' }}>{formattedDate}</span>;
            },
        },
    ];

    return (
        <div className="p-4" style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="w-full" style={{ backgroundColor: '#000' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-white">Artists</h1>
                        <button
                            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center ${isLoggedInUserArtist ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={handleAddArtist}
                            disabled={isLoggedInUserArtist}
                        >
                            <HiOutlinePlusCircle className="mr-2" />Join as Artist
                        </button>
                    </div>
                    <ReactTable
                        data={selectedUsers}
                        columns={columns}
                        defaultPageSize={5}
                        showPageSizeOptions={true}
                        minRows={0}
                        getTheadThProps={() => {
                            return {
                                style: {
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '10px',
                                },
                            };
                        }}
                        getTheadTrProps={() => {
                            return {
                                style: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            };
                        }}
                        getTrProps={(state, rowInfo, column) => {
                            return {
                                style: {
                                    backgroundColor: rowInfo && rowInfo.row && rowInfo.row.index % 2 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    padding: '10px', // Adjust padding for row entries
                                },
                            };
                        }}
                    />
                </div>
            </Container>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-md p-8  w-1/3">
                        <h2 className="text-3xl font-bold  text-center mb-5">Select User To make Artist</h2>
                        <select
                            className="w-full p-2 mb-6 bg-gray-200 rounded-md"
                            onChange={(e) => handleSelectUser(e.target.value)}
                            value={selectedUser} // Set value to user id if selectedUser is not null
                        >
                            <option value="">Select User</option>
                            {loggedInUser && (
                                <option value={loggedInUser.id}>{loggedInUser.username}</option>
                            )}
                        </select>

                        <div className='flex justify-end gap-1.5'>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${isAddingArtist ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={handleUpdateUser}
                            >
                                Create Artist
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />

        </div>
    );
}

export default Artists;

