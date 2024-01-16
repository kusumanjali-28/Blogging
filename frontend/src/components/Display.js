import React, { useState, useEffect } from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Display = () => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [commentText, setCommentText] = useState(''); // Add this line

  useEffect(() => {
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
  

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/like/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { success, message, likes: updatedLikes } = await response.json();

      if (success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === postId ? { ...item, likes: updatedLikes } : item
          )
        );
      } else {
        console.error('Error adding like:', message);
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, username: userDetails.username }),
      });
  
      const { success, message, comments: updatedComments } = await response.json();
  
      if (success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === postId ? { ...item, comments: updatedComments } : item
          )
        );
      } else {
        console.error('Error adding comment:', message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <h2 style={{color:'#a72eb2',textAlign:'center',paddingTop:'10px',fontFamily:'URW Chancery L, cursive',textDecorationLine:'blink',fontWeight:'bolder'}}>Public Posts</h2>

      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" style={{ backgroundColor: "#d0bdf4" }} key={index}>
            <h3 style={{ fontFamily: "cursive" }}>{item.title}</h3>
            <img src={`http://localhost:5000/${item.path}`} style={{ height: '250px' }} alt={item.title} />
            <p>{item.content}</p>
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ padding: '15px', scale: '1.5', cursor: 'pointer' }}
                color='red'
                className="like-icon"
                onClick={() => handleLike(item._id)}
              />
              <span>{item.likes}</span>
            </div>
            <div className="comments-section">
            <h4>Comments:</h4>
            {item.comments.map((comment, commentIndex) => (
              <div key={commentIndex} className="comment">
                <strong>{comment.username}:</strong> {comment.text}
              </div>
            ))}
            <div className="add-comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={() => handleComment(item._id, commentText)}>Post Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Display;
