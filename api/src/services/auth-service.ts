import argon2 from 'argon2';
import UserRepository from '../repository/user-repository';
import {BadRequestError, NotFoundError} from '../utils/AppError';
import 'colors';

const repo = new UserRepository();

class AuthService {
    async signUpUser(userData: any) {
        try {

        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async loginUser(userData: {email:string,password:string}) {
        try {

        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default AuthService;
