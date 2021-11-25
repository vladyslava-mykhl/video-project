const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.findOne({phone: req.body.phone});
        if (user) {
           throw ApiError.BadRequest('This user already exists');
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error', errors.array()));
        };
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createdUser = await User.create({
            phone: req.body.phone,
            username: req.body.username,
            password: hashedPassword
        });
        return res.json(createdUser)
    } catch (e) {
        next(e);
    }
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
