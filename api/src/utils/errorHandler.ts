import { AppError } from './AppError';
import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if ((err as AppError).isOperational) {
        const appError = err as AppError;
        res.status(appError.statusCode).json({
            status: appError.status,
            message: appError.message,
            error: appError
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

export default errorHandler;
