import { useState } from "react";
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function Verify() {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [formData, setFormData] = useState({
    code: 0,
    email:email,
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
    
    try {
      const response = await fetch(`${BASE_URL}/api/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(response.ok) {
            // If the response is successful
            setStatus(data.message);
            setSuccess(true);
            // console.log(data);
            toast.success("email verification success");
            navigate("/api/login", { state: { email: formData.email } });
        }
        else {
        // If the response is not successful
            toast.error(data.message || "Invalid email or password");
            setStatus(data.message || "Invalid email or password");
            setSuccess(false);
        }   
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("Error signing up.");
    }
  };

    return (
       <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:"#FDE49E"}}>
    <div className="w-50">
        <h2 className="text-center mb-4">Verify Your Account</h2> {/* Add a header */}
        <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm">
            <p style={{ color: "red" }}>{!success ? status : ""}</p>
            <p style={{ color: "green" }}>{success ? status : ""}</p>
            <div className="mb-3">
                <label htmlFor="code" className="form-label">Enter the verification code</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="code" 
                    name="code" 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button className="btn btn-success w-100 bg-success">Verify</button> {/* Full width button */}
        </form>
    </div>
</div>

    )
}

export default Verify;