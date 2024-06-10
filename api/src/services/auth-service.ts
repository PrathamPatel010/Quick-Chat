import argon2 from 'argon2';
import UserRepository from '../repository/user-repository';
import {BadRequestError, NotFoundError} from '../utils/AppError';
import 'colors';

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
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async loginUser(userData: {email:string,password:string}) {
        try {
            const user = await repo.userExist({email:userData.email});
            if (!user){
                throw new NotFoundError("No User found with this email");
            }
            const checkPass = await argon2.verify(user.password,userData.password);
            if (!checkPass){
                throw new BadRequestError("Credentials are wrong");
            }
            return user;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default AuthService;
