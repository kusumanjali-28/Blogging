import React, { useState, useEffect } from 'react';
import './Main.css';
import {  Navigate, useNavigate } from 'react-router-dom';

function AuthPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // State to track whether to show login or registration form
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [newReg, setNewReg] = useState({ user: '', email: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
 
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    // Fetch the list of registered users when the component mounts
    fetch('https://blog-ain8.onrender.com/api/regs')
      .then((res) => res.json())
      .then((data) => setRegisteredUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReg((prevReg) => ({
      ...prevReg,
      [name]: value,
    }));
    setLoginError(''); // Clear login error when input changes
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login logic
      const { email, pass } = newReg;
      const user = registeredUsers.find((u) => u.email === email && u.pass === pass);

      if (user ) {
        const userDetails = {
          id: user.user, // Replace with the actual property name for user ID
          username: user.email, // Replace with the actual property name for username
          // Add other relevant user details as needed
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        console.log(JSON.stringify(userDetails));
        
        // Successful login, perform the necessary actions (e.g., set authentication state)
        console.log('Login successful');
        setLoggedIn(true);
        navigate('/Main');

      } else {
        // Failed login, show an error message
        setLoginError('Invalid email or password');
      }
    } else {
      const { email } = newReg;
    const user = registeredUsers.find((u) => u.email === email);

    if (user) {
      // User already exists, show an error message
      setLoginError('User already exists');
    } else {
      // User does not exist, proceed with registration
      fetch('https://blog-ain8.onrender.com/api/regs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReg),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Registration failed');
          }
          return res.json();
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Registration successful');
            alert("Now please Login")
            navigate('/Main')
          } else {
            console.error('Registration failed');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }}
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const img = 'https://www.shutterstock.com/image-vector/vector-seamless-pattern-blogging-social-260nw-434264536.jpg'
  return (
    <div className='pp2' style={{ backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: '1550px 790px' }}>
      <div id="div1" className='reg'>
        <form onSubmit={handleFormSubmit}>
          <h2 style={{textAlign:'center'}}>{isLogin ? 'User Login' : 'User Registration'}</h2>

          {!isLogin && (
            <div >
              <label>User:</label>
              <br />
              <input
                className='userp'
                type="text"
                name="user"
                onChange={handleInputChange}
                id="user"
                placeholder="Enter your user name here"
                required
              />
            </div>
          )}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            id="email"
            placeholder="Enter your email"
            required
            style={{
              padding: '8px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />

          <label>Password:</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="pass"
            onChange={handleInputChange}
            id="pass"
            placeholder="Enter password"
            required
            pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
          />

         
            <div>
              <label htmlFor="cb" onClick={togglePassword}>
                <b>Show Password</b>
              </label>
            </div>
          

          <input type="submit" className='submit' value={isLogin ? 'Login' : 'Register'} />
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={toggleForm}>
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
