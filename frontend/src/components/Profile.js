import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Main'; // Import your CSS file
import { FaUser } from 'react-icons/fa';

const UserInfoPage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  return (
    <div>
    <Navbar />
    <div className="user-info-container">
     
      <div className="user-info-box">
     
         <h3 style={{color:'blue',textAlign:'center'}}> <FaUser size={32} color="Blue" />User Information</h3>
        <br/>
        {userDetails ? (
          <div>
            <p style={{color:'white',fontSize:'20px',textAlign:'center'}}><b>Username:</b> {userDetails.id}</p>
            <p style={{color:'white',fontSize:'20px',textAlign:'center'}}> <b>Mail Id:</b> {userDetails.username}</p>
            {/* Display other user details as needed */}
          </div>
        ) : (
          <p style={{color:'white'}}>Please Login</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserInfoPage;
