import React, { useState, useEffect } from 'react';
import './Main.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
const MyPost = () => {
  const [data, setData] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images');
        const images = await response.json();
        setData(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete/${postId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log(result);

      // Update the state after successful deletion
      if (result.success) {
        setData((prevData) => prevData.filter(item => item._id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  
  const handleEditAndSubmit = async (post) => {
    try {
      if (!post) {
        console.error('Error: Attempting to edit with null post');
        return;
      }
  
      const editedTitle = prompt('Enter new title:', post.title);
      const editedContent = prompt('Enter new content:', post.content);
  
      if (editedTitle !== null && editedContent !== null) {
        const response = await fetch(`http://localhost:5000/api/edit/${post._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        });
  
        const updatedData = await response.json();
  
        if (updatedData.success) {
          setData((prevData) =>
            prevData.map((item) => (item._id === post._id ? { ...item, title: editedTitle, content: editedContent } : item))
          );
          setEditPost(null); // Reset editPost state after successful update
        }
      }
    } catch (error) {
      console.error('Error handling edit and submit:', error);
    }
  };
  
  const pp = userDetails ? `"${userDetails.username}"` : '';
console.log(pp);
   const filteredData = data.filter(item => item.username === pp);

  return (
    <div>
    <Navbar></Navbar>
    <h2 style={{color:'#a72eb2',textAlign:'center',paddingTop:'10px',fontFamily:'URW Chancery L, cursive',textDecorationLine:'blink',fontWeight:'bolder'}}>My Posts</h2>

    <div className="card-container">
        {filteredData.map((item, index) => (
          <div className="card" style={{ backgroundColor: "#d0bdf4" }} key={index}>
            {/* ... (existing card content) */}
            <h3 style={{ fontFamily: "cursive" }}>{item.title}</h3>
            <img src={`http://localhost:5000/${item.path}`} style={{ height: '250px' }} alt={item.title} />
            <p>{item.content}</p>
            <p><b>Likes </b>{item.likes}</p>
            <div className="icon-container">
              <FontAwesomeIcon icon={faEdit} style={{ padding: '15px', scale: '1.5' }} onClick={() => handleEditAndSubmit(item)} className="edit-icon" />
              <FontAwesomeIcon icon={faTrash} style={{ padding: '15px', scale: '1.5' }} onClick={() => handleDelete(item._id)} className="delete-icon" />
              <div className="comments-section">
            <h4>Comments:</h4>
            {item.comments.map((comment, commentIndex) => (
              <div key={commentIndex} className="comment">
                <strong>{comment.username}:</strong> {comment.text}
              </div>
            ))}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
