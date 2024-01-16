// imageRouter.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('./PostModel');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title } = req.body;
      const { content } = req.body;
    const imagePath = req.file.path;
    const username = req.body.username; 

    const newImage = new Image({ title, path: imagePath,content,username, });

    await newImage.save();
    res.json({ message: 'Title, image, and likes uploaded successfully' });
  } catch (error) {
    console.error('Error saving title, image, and likes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/edit/:postId', async (req, res) => {
  // ... (same as in your original code)
  const postId = req.params.postId;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;
  // console.log('Received PUT request with data:', { postId, updatedTitle, updatedContent });
  try {
    const updatedPost = await Image.findByIdAndUpdate(postId, { title: updatedTitle, content: updatedContent }, { new: true });

    if (!updatedPost) {
      console.log('Post not found');
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // console.log('Post updated successfully:', updatedPost);
    res.json({ success: true, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/delete/:postId', async (req, res) => {
  // ... (same as in your original code)
  const postId = req.params.postId;

  try {
    await Image.findByIdAndDelete(postId);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/images', async (req, res) => {
  // ... (same as in your original code)
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// ... (previous code)

router.put('/like/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const updatedPost = await Image.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } }, // Increment the likes by 1
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, message: 'Like added successfully', likes: updatedPost.likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ... (remaining code)

// ... (previous code)

router.post('/comment/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { text, username } = req.body;

  try {
    const updatedPost = await Image.findByIdAndUpdate(
      postId,
      { $push: { comments: { text, username } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, message: 'Comment added successfully', comments: updatedPost.comments });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/edit-comment/:postId/:commentId', async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { text } = req.body;

  try {
    const updatedPost = await Image.findOneAndUpdate(
      { _id: postId, 'comments._id': commentId },
      { $set: { 'comments.$.text': text } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post or comment not found' });
    }

    res.json({ success: true, message: 'Comment updated successfully', comments: updatedPost.comments });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/delete-comment/:postId/:commentId', async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const updatedPost = await Image.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post or comment not found' });
    }

    res.json({ success: true, message: 'Comment deleted successfully', comments: updatedPost.comments });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ... (remaining code)


module.exports = router;
