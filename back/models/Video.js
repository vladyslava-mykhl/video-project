const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    videoPath: {
        type: String,
        required: true
    },
   screenPath: {
        type: Array,
        required: true
    },
    id: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Video', videoSchema);