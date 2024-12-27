import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupSuccess, signupError } from "./signupAction";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import toast from 'react-hot-toast'
import  axios  from 'axios'
const BASE_URL = process.env.REACT_APP_BACKEND_URL; 
// const BASE_URL = "https://collaborativecoding-server.vercel.app"
; 

function Signup() {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    repassword: "",
    isVerified: false,
  });

  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.signup);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      //dispatch(loader()); // Show loader
      //  console.log(BASE_URL);
      // const response = await fetch(`${BASE_URL}/api/signup`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
        
    //   const response=await axios.post(`${BASE_URL}/api/signup`, formData)
    //  .then(response => console.log(response.data))
    //    .catch(thrown => {
    //   if (axios.isCancel(thrown)) {
    //   console.log('Request canceled:', thrown.message);
    // } else {
    //   console.error(thrown);
    // }
      // });
      const response = await axios.post(`${BASE_URL}/api/signup`,formData);

    
      console.log("Server Response:", response.data);
    
      
      // const data = await response.json();
      // console.log(data);
      // if (!response.ok) {
      // console.log(response.ok);
      //  }
      // if (response.ok) {
      //   dispatch(signupSuccess(data));
      //   toast.success("Signup verification code sent successfully!");
      //   navigate("/api/verify-email", { state: { email: formData.email } });
      // } else {
      //   dispatch(signupError(data.message || "Signup failed."));
      //   setStatus(data.message || "Signup failed yaa")
      //   setSuccess(true)
      //   toast.error(data.message || "An error occurred.");
      // }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Signup failed res",error)
      setSuccess(true)
      dispatch(signupError(error.message || "Unexpected error occurred."));
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      //dispatch(loader()); // Hide loader
    }
  };

  return (

    
    <div className="container-fluid signup1 d-flex justify-content-center align-items-center vh-100 fs-6 sm:m-2">
      <form onSubmit={handleSubmit} className="bg-primary-subtle p-3 rounded row">
       
          {success && (
                  <p style={{color:'red'}}>
           {status}
                 </p>
          )}
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" required onChange={handleChange} />
          </div>
           <div className="mb-3 mt-5">            
           <Link to="/api/login" className="px-5">&larr;   Back </Link>
          </div>
       
        </div>
        <div className="col-6">
             
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="repassword" name="repassword" required onChange={handleChange} />
          </div>
        
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
