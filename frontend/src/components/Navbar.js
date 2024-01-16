// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState,useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve userDetails from local storage
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };
   const img = 'https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-12899.jpg'
  return (
    <div className="topnav">
       <img className="mainp" src={img} style={{height:'80px',width:'80px',marginTop:'0px',marginRight:'50px',marginLeft:'-200px'}}  alt="Logo" />
      <Link to='/New'>+ Create Post</Link>
      <Link to="/Display">View Posts</Link>
      <Link to="/MyPost">My Posts</Link>
      <Link to="/Contact">Contact Us</Link>
      <Link to="/Profile">
            <FaUser size={32} color="blue" />
            User Details
          </Link>
      {userDetails ? (
        <>    
          <button onClick={handleLogout}>{` Logout`}</button>
           <span style={{color:"white",paddingLeft:'50px'}}>welcome, {userDetails.id} </span>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
              
    

    </div>
  );
};

export default Navbar;
