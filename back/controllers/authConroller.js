const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const user = await User.findOne({ phone: req.body.phone })
    if (user) {
        throw new Error('This user already exists')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const createdUser = await (new User({
        phone: req.body.phone,
        username: req.body.username,
        password: hashedPassword,
    })).save()

    res.json({ message: req.body })
}

// exports.login = async (req, res) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: err.message
//             })
//         }
//
//         req.login(user, { session: false }, async err => {
//             if (err) {
//                 res.send(err)
//             }
//             const permissions = await user.getPermissions()
//             const preparedUser = Object.assign({}, user.toJSON(req), { permissions })
//             const token = jwt.sign(preparedUser, 'somesecrettoken')
//             return res.json({ user: preparedUser, token })
//         })
//     })(req, res)
// }
//
