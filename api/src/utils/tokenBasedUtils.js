const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/serverConfig");

function generateToken(tokenData){
    try{
        const token = jwt.sign(tokenData,JWT_SECRET);
        return token;
    } catch (error){
        console.log(error);
        throw error;
    }
}

module.exports = {generateToken};