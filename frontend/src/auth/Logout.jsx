// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./signupAction";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async() => {
        try {
            const response = await fetch(`${BASE_URL}/api/logout`, {
                method: "POST",
        
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message || "Logged out successfully");
                dispatch(logout());
                Cookies.remove('token');
                navigate("/api/login"); // Redirect to login page
            } else {
                //console.log(error.message, data);
                toast.error("Failed to log out. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error.message);
            toast.error("An error occurred. Please try again later.");
        }
    };
    handleLogout();

    return null;
};

export default Logout;


