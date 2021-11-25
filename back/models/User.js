const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    id: {
        type: String
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)