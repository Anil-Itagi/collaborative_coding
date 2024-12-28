import React, { useEffect } from "react";
import i from "../images/colab.png"
import syntax from "../images/syntax.jpg";
import collaboration from "../images/collaboration.jpg"
import vd from '../images/vd coference.png'
import Cookies from 'js-cookie';
import DemoVideo from "../images/vd demo.mp4"
import { useLocation} from "react-router-dom";

const FirstPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
   useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token); // Sets to true if token exists, false otherwise
   }, [location]);
  
  return (
    <div style={{backgroundColor:"#FDE49E"}} >
          {/* Main Hero Section */}
      <div className="container-fluid p-5"  >
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <h1>Welcome to CodeColab</h1>
            <p className="lead">
              Experience seamless real-time collaborative coding with an
              integrated video conferencing solution. Perfect for teams and
              learners alike!
            </p>
            <a href="#features" className="btn btn-primary btn-lg">
              Explore Features
            </a>
          </div>
          <div className="col-lg-6 text-center">
            <img
              src={i}
              alt="Collaboration"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
{/* all featuers */}
      <div id="features" className="bg-light py-5">
  <div className="container text-center">
    <h3>Our Features</h3>
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <img
              src={collaboration}
              alt="Real-Time Collaboration"
              className="img-fluid mb-3"
            />
            <h5 className="card-title">Real-Time Collaboration</h5>
            <p className="card-text">
              Edit and share code in real-time with teammates.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <img
              src={vd}
              alt="Video Conferencing"
              className="img-fluid mb-3"
            />
            <h5 className="card-title">Video Conferencing</h5>
            <p className="card-text">
              Integrated video chat to communicate effectively.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <img
              src={syntax}
              alt="Syntax Highlighting"
              className="img-fluid mb-3"
            />
            <h5 className="card-title">Syntax Highlighting</h5>
            <p className="card-text">
              Enjoy a beautiful editor with smart syntax highlighting.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
      

      <div id="video-section" class="text-center my-5">
  <h2 class="mb-4">Demo Project Video</h2>
  <p class="mb-4">
    Watch this 20-second demo to understand how our project works.
  </p>
  <video width="640" height="360" controls>
  <source src={DemoVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
    </div>
  );
};

export default FirstPage;
