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
        <div className="container-fluid signup1 d-flex justify-content-center align-items-center vh-100 fs-6 p-3" style={{backgroundColor:"#FDE49E"}}>
  <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-lg row w-75">
    <h2 className="text-center mb-4 fw-bold ">Login</h2>

    {status && (
      <p style={{ color: success ? "green" : "red" }} className="text-center">
        {status}
      </p>
    )}

    <div className="col-12">
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          required
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-bold">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          required
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <div className="mb-3" style={{display:"flex",justifyContent:"space-between"}}>
        <Link to="/api/signup" className="btn btn-link text-decoration-none text-white bg-success mx-1">
          New User? Sign Up
        </Link>
        <Link to="/api/forgot-password" className="btn btn-link text-decoration-none text-white bg-success mx-1">
          Forgot Password?
        </Link>
      </div>
    </div>
    
    <div className="text-center">
      <button className="btn btn-primary px-5 mt-3 bg-danger">Submit</button>
    </div>
  </form>
</div>
    );
}

export default Login;
