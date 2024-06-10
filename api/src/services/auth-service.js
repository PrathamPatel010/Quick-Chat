const argon2 = require('argon2');
const UserRepository = require('../repository/user-repository');
const { BadRequestError } = require('../utils/AppError');
const repo = new UserRepository();

class AuthService {
    async signUpUser(userData) {
        try {
            const userExist = await repo.userExist(userData);
            if (userExist) {
                throw new BadRequestError('User with same email OR username already exists');
            }
            userData.password = await argon2.hash(userData.password);
            let res = await repo.create(userData);
            return res;
        } catch (error) {
            console.log("Error occurred at user service layer ", error.message);
            throw error;
        }
    }
}

module.exports = AuthService;
