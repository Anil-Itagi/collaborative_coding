import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast'

const BASE_URL = process.env.REACT_APP_BACKEND_URL; 

function ResetPassword() {
  const { resetToken } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      password: "",
      repassword:"",
  });


 
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
               alert("Passwords do not match.");
               return;
      }
      

    try {
    
      const response = await fetch(`${BASE_URL}/api/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
   
      const data = await response.json();
      
      console.log(data);
      toast.success("password reset successful!");
        navigate("/api/login");
        
    } catch (error) {
       toast.error('Error')
      console.error("Error:", error);
    }
  };
    return (
        <div className="container-fluid signup d-flex justify-content-center align-items-center vh-100 fs-6 sm:m-2">
      <form onSubmit={handleSubmit} className="bg-primary-subtle p-3 rounded row">
        
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
       
        <div className="mb-3">            
           <Link to="/api/login" className="px-5"> Back </Link>
        </div>
        <button  className="btn btn-primary">Submit</button>
     </form>      
    </div>
    )
}
export default ResetPassword;