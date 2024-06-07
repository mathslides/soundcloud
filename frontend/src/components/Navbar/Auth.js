import React, { useState } from "react";
import { Icon } from '../../Icons';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { onSignOutSuccess } from "../../store/sessionSlice";

function Auth() {
    const user = {
        name: 'Tayfun Erbilen',
        avatar: 'https://i.scdn.co/image/ab6775700000ee856fca122911ed9eec4ce60c1e',
    };
    const loggedInUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        // dispatch(onSignOutSuccess());
        history.push('/');
    };



    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                className={`flex items-center focus:outline-none rounded-full px-4 py-3 ${isOpen ? 'bg-gray-800 hover:bg-gray-700' : 'bg-black hover:bg-gray-800'
                    }`}
                onClick={toggleMenu}
            >
                <img src={user.avatar} className="w-8 h-8 rounded-full mr-2" alt="User Avatar" />
                <span className="text-sm text-white font-semibold mr-2">{loggedInUser?.username}</span>
                <Icon size={16} name="downDir" className={`transform ${isOpen ? 'rotate-180' : ''} text-white`} />
                {/* <Icon size={16} name="downDir" className={`transform ${isOpen ? 'rotate-180' : ''} text-white`} /> */}
            </button>
            {isOpen && (
                <ul className="absolute top-full right-0 bg-black text-white shadow-md w-48 mt-1">
                    <li className="hover:bg-gray-700 px-4 py-2">
                        <a href="#">Profile</a>
                    </li>
                    <li className="hover:bg-gray-700 px-4 py-2">
                        <a href="#">Account</a>
                    </li>
                    <li className="hover:bg-gray-700 px-4 py-2">
                        <button onClick={handleLogout}>Log out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Auth;
