// pages/logout.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const LogoutPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                dispatch(logout());
                history.push('/');
            } catch (error) {
                console.error("Logout failed:", error);
                alert("Failed to logout. Please try again.");
            }
        };
        handleLogout();
    }, [dispatch]);

    return <div>Logging out...</div>;
};

export default LogoutPage;
