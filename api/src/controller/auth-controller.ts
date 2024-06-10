import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth-service';
import { generateToken } from '../utils/tokenBasedUtils';

const authService = new AuthService();

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await authService.signUpUser(req.body);
        const token = generateToken({ userId: response.id, email: response.email, username: response.username });
        const responseToBeSent = { ...response,token};
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: responseToBeSent,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default { signUp };
