const { AppError } = require('./AppError');

function errorHandler(err, req, res, next) {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
            error: err
        });
    }
}

module.exports = errorHandler;
