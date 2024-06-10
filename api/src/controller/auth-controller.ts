import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth-service';
import { generateToken } from '../utils/tokenBasedUtils';

const authService = new AuthService();

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await authService.signUpUser(req.body);
        const token = generateToken({ userId: response.id, email: response.email, username: response.username });
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: {
                _id: response.id,
                username: response.username,
                email: response.email,
                pic: response.pic,
                token: token
            },
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function login(req:Request, res:Response, next: NextFunction){
    try {
        const response = await authService.loginUser(req.body);
        const token = generateToken({ userId: response.id, email: response.email, username: response.username });
        return res.status(200).json({
            message: 'User Signed-In successfully',
            success: true,
            data: {
                _id: response.id,
                username: response.username,
                email: response.email,
                pic: response.pic,
                token: token
            },
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default { signUp,login };
