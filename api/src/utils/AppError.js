class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message || 'Not Found', 404);
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message || 'Bad Request', 400);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError
};