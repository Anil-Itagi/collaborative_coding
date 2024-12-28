import { useState } from "react";
import { useDispatch } from "react-redux";
import {  loginSuccess } from "./signupAction";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BACKEND_URL;


function Login() {
    const [status, setStatus] = useState("");
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          //  dispatch(loader()); // Start loader
            var response = {};
           try {
              response = await axios.post(`${BASE_URL}/api/login`,formData);
             } catch (error) {
              console.log(' hnj'+error);
             }
           // dispatch(unLoader());
            const data = await response.data;
            if (response.status) {        
                 // Fractional value for 10 seconds            
                   Cookies.set('token', data.token, {
                    expires: 0.02, // 1 hour
                 // Only sent over HTTPS
                   // sameSite: 'Strict',
                   });
                toast.success(data.message || "Login successful!")
                //alert(data.message || "Login successful!"); // Show alert
             //   dispatch(loginSuccess(data.user)); // Update Redux state
                setSuccess(true);
                setStatus("Login successful! Redirecting...");
                navigate("/"); // Redirect to home
            } else {
                // On error
                setSuccess(false);
                setStatus(data.message|| "Invalid email or password");
                toast.error(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("An error occurred. Please try again later.");
            setSuccess(false);
            toast.error("An error occurred. Please try again later.");
        } 
    };

    return (
        <div className="container-fluid signup1 d-flex justify-content-center align-items-center vh-100 fs-6 sm:m-2">
            <form onSubmit={handleSubmit} className="bg-primary-subtle p-3 rounded row">
                <div className="col-12">
                    {status && (
                        <p style={{ color: success ? "green" : "red" }}>{status}</p>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <Link to="/api/signup" className="px-5">
                            New User
                        </Link>
                        <Link to="/api/forgot-password" className="px-5">
                            Forgot Password
                        </Link>
                    </div>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
