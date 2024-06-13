import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth-service';

const authService = new AuthService();

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await authService.signUpUser(req.body);
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function login(req:Request, res:Response, next: NextFunction){
    try {
        const response = await authService.loginUser(req.body);
        return res.status(200).json({
            message: 'User Signed-In successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default { signUp,login };
