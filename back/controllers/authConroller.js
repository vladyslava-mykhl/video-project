const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.findOne({phone: req.body.phone}) || await User.findOne({username: req.body.username});
        if (user) {
           throw ApiError.BadRequest('This user already exists');
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Your password must be at least 5 characters long', errors.array());
        };
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createUser = await User.create({
            phone: req.body.phone,
            username: req.body.username,
            password: hashedPassword
        });
        const createdUser = Object.assign({}, createUser.toJSON());
        delete createdUser.password;
        console.log(createdUser);
        return res.json(createdUser);
    } catch (e) {
        next(e);
    };
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({phone: req.body.phone}).select("password").select("username");
        if (!user) {
            throw ApiError.BadRequest('This user does not exist');
        };
        const preparedUser = Object.assign({}, user.toJSON());
        delete preparedUser.password;
        const isPassEquals = await bcrypt.compare(req.body.password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        };
        return res.json({preparedUser});
    } catch (e) {
        next(e);
    };
};
