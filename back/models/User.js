const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        trim: true,
        required: 'Please enter a phone number'
    },
    password: {
        type: String,
        select: false,
        required: 'Please supply a password'
    },
    id: {
        type: String
    },
    username: {
        type: String,
        required: 'Please enter a username',
        trim: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)