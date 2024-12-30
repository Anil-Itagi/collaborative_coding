import { Link ,useLocation} from "react-router-dom";
// import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import "./pageNav.css"
import { useEffect, useState } from "react";


function PageNav() {
   const location = useLocation();
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token); // Sets to true if token exists, false otherwise
   }, [location]);
   
    return (
         <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#6DC5D1"}}>
      <div className="container-fluid">
          <a className="nosifer-regular navbar-brand" href="/" >Code collab</a>
                   
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>     
            </li>
              
            <li className="nav-item">
             <Link className="nav-link" to="api/signup">Signup</Link>
            </li>
              {
                 isAuthenticated ?
                <li className="nav-item">
                     <Link className="nav-link" to="api/logout">Logout</Link>
                  </li> 
                  : 
                  
                <li className="nav-item">
                     <Link className="nav-link" to="api/login">Login</Link>
                  </li>
              }  
              <li className="nav-item">
              {isAuthenticated?    <Link className="nav-link" to="/home">Join meeting</Link>:""}         
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
    
}
export default PageNav;