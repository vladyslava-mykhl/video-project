const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getCategories = async (req, res, next) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        next(err);
    };
};
