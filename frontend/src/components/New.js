import React, { useEffect,useState } from 'react';
import './Main.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const New = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };


  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      // If userDetails is not in localStorage, you may want to set it to an empty object or handle it differently
      setUserDetails({});
    }
  }, []);
 

  const navigate = useNavigate();
  
  const handleImageUpload = async () => {
    try {
      if (!title || !image || !content) {
        setError('Please fill in all fields');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      formData.append('content', content);
      formData.append('username', JSON.stringify(userDetails.username) );

      const response = await fetch('https://blog-ain8.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });
      if(!(JSON.stringify(userDetails.username)))
      {alert("Please Login/Register"); navigate('/');return;}

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/Display');
      } else {
        setError('Error uploading title and image');
      }
    } catch (error) {
      setError('Internal Server Error');
      console.error('Error uploading title and image:', error);
    }
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className="pp2" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)' }}>
      <div id="div1" className="new">
        <h2 style={{ textAlign: 'center', color: 'White',fontFamily:'URW Chancery L, cursive' }}>Create Your Post</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p>
          <label style={{ marginTop: '30px', fontSize: '20px' }}>
            <b>Title :</b>{' '}
          </label>{' '}
        </p>
        <input type="text" placeholder="Enter your title" value={title} onChange={handleTitleChange} />
        <br />
        <br />
        <p>
          <label style={{ fontSize: '20px' }}>
            <b>Content :</b>{' '}
          </label>
        </p>

        <textarea style={{ width: '200px' }} placeholder="Enter the content of post" value={content} onChange={handleContentChange} />
         

        <input style={{ paddingLeft: '90px', paddingTop: '20px' }} type="file" onChange={handleImageChange} />
      
        <button onClick={handleImageUpload} style={{ backgroundColor: 'green', marginTop: '20px', height: '50px' }}>
          Upload Title and Image
        </button>
      </div>
      </div>
    </div>
  );
};

export default New;
