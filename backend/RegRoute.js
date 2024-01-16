// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const RegPost = require('./RegModel');
const jwt = require('jsonwebtoken');

// Get all blog posts
router.get('/regs', async (req, res) => {
  try {
    const posts = await RegPost.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Create a new blog post
router.post('/regs', async (req, res) => {
  const post = new RegPost({
    user: req.body.user,
    email:req.body.email,
    pass:req.body.pass,
  });

  try {
    const savedPost = await post.save();

    // Create a JWT token with user information
    const token = jwt.sign({ userId: savedPost._id }, 'your_secret_key_here', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Export the router as the default export
module.exports = router;
