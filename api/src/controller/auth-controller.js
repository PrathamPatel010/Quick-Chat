const AuthService = require('../services/auth-service');
const { generateToken } = require('../utils/tokenBasedUtils');
const authService = new AuthService();

async function signUp(req, res, next) {
    try {
        let response = await authService.signUpUser(req.body);
        const token = generateToken({ userId: response.id, email: response.email, username: response.username });
        response = { ...response, token };
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

module.exports = { signUp };
