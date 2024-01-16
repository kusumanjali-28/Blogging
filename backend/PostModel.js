const mongoose = require('mongoose');

const Image = mongoose.model('Image', {
  title: String,
  content: String,
  path: String,
  username: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      username: String,
    },
  ],
});

module.exports = Image;

