const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.registerUser = async (req, res) => {
    const createdUser = await (new User({
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
    })).save()

    res.json({ message: 'done' })
}

