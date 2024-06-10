class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message?: string) {
        super(message || 'Not Found', 404);
    }
}

class BadRequestError extends AppError {
    constructor(message?: string) {
        super(message || 'Bad Request', 400);
    }
}

export {
    AppError,
    NotFoundError,
    BadRequestError
};
