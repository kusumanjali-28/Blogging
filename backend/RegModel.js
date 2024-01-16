const mongoose = require('mongoose');

const RegPost = new mongoose.Schema({
    user: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            pass: {
                type: String,
                required: true
            },
});

module.exports = mongoose.model('RegPost', RegPost);
