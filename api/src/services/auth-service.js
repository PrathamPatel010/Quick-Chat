const argon2 = require('argon2');
const UserRepository = require('../repository/user-repository');
const {generateToken} = require("../utils/tokenBasedUtils");
const repo = new UserRepository();

class AuthService{
    async signUpUser(userData){
        try{
            const userExist = await repo.get(userData.email);
            if (userExist){
                return {status:400,message:"User already exist"};
            }
            userData.password = await argon2.hash(userData.password);
            let res = await repo.create(userData);
            return res;
        } catch (error){
            console.log("Error occurred at user repository layer ", error.message);
            throw error;
        }
    }
}

module.exports = AuthService;