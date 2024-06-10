import argon2 from 'argon2';
import UserRepository from '../repository/user-repository';
import { BadRequestError } from '../utils/AppError';

const repo = new UserRepository();

class AuthService {
    async signUpUser(userData: any) {
        try {
            const userExist = await repo.userExist(userData);
            if (userExist) {
                throw new BadRequestError('User with same email OR username already exists');
            }
            userData.password = await argon2.hash(userData.password);
            let res = await repo.create(userData);
            return res;
        } catch (error) {
            console.log("Error occurred at user service layer ", (error as Error).message);
            throw error;
        }
    }
}

export default AuthService;
