import { useState } from "react";
import { useDispatch } from "react-redux";
import { loader, loginSuccess } from "./signupAction";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

const BASE_URL = process.env.REACT_APP_BACKEND_URL; 
function ForgotPassword() {
    
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const dispatch = useDispatch();
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(loader());
        const response = await fetch(`${BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
   
      const data = await response.json();
      setStatus(data.message);
      setSuccess(data.success);
      console.log(data);
      dispatch(loginSuccess(formData));
      toast.success(`reset password link sent successful! `);

      
    } catch (error) {
       toast.error('Error in forget password')
       console.error("Error:", error);
    } finally {
       dispatch(loader());
    }
  };
    return (
        <div className="container-fluid signup d-flex justify-content-center align-items-center vh-100 fs-6 sm:m-2">
      <form onSubmit={handleSubmit} className="bg-primary-subtle p-3 rounded row">
        <p style={{ color: "red" }}>{!success ? status : ""}</p>
        <p style={{ color: "green" }}>{success ? status : ""}</p>
       
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
          </div>
         
          
       
            <div className="mb-3">
                    
           <Link to="/api/login" className="px-5">  Back </Link>
        
                </div>
        <button  className="btn btn-primary">Submit</button>
     </form>      
    </div>
    )
}
export default ForgotPassword;