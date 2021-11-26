const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err.message)
    if (err instanceof ApiError) {
        return res.status(err.status).json({error: err.message});
    };
    return res.status(500).json({message: "Error"});
};