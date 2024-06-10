const AuthService = require('../services/auth-service');
const {generateToken} = require("../utils/tokenBasedUtils");
const authService = new AuthService();

async function signUp(req,res){
    try{
        let response = await authService.signUpUser(req.body);
        const token = generateToken({userId:response.id,email:response.email,username:response.username});
        response = {...response,token};
        return res.status(201).json({
            message: 'User registered Successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error){
        console.log(error.message);
        return res.status(500).json({
            message: error.message,
            success: false,
            data: {},
            error: error
        });
    }
}

module.exports = {signUp}