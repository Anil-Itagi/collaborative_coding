import './app.css'
import { createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import {Toaster} from 'react-hot-toast'
import NotFound from './components/NotFound';
import Cookies from 'js-cookie';
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Verify from "./auth/Verify";
import Logout from "./auth/Logout";
import Footer from './components/Footer';
import PageNav from './components/PageNav';
import FirstPage from './pages/FirstPage';
import { useEffect, useState } from 'react';



// Layout Component
const Layout = () => (
  <>
    <PageNav />
    <Outlet />
    <Footer />
  </>
);
//console.log(Cookies.get('token'));

function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/> ,
      children: [
        { path: "/", element: <FirstPage isAuthenticated={isAuthenticated } setIsAuthenticated={ setIsAuthenticated} /> },
        { path: "/home", element: <Home/> },
        { path: "api/signup", element: <Signup /> },
        { path: "api/verify-email", element: <Verify /> },
        { path: "api/login", element: <Login /> },
        { path: "api/logout", element: <Logout /> },
        { path: "api/forgot-password", element: <ForgotPassword /> },
        { path: "api/reset-password/:resetToken", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
       
      ],
    },
     {
          path: "editor/:roomId",
          element: isAuthenticated ? <EditorPage /> : <Login />          
      },
  ]);
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              primary:'#4aed88',
            }
          }}
        >

        </Toaster>
      </div>
       <RouterProvider router={router}  />
    </>
  );
}

export default App;
