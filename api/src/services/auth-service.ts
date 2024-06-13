import argon2 from 'argon2';
import UserRepository from '../repository/user-repository';
import {BadRequestError, NotFoundError} from '../utils/AppError';
import 'colors';
import {CreateUserDto} from "../dto/user-dto";
import {generateToken} from "../utils/tokenBasedUtils";

const repo = new UserRepository();

class AuthService {
    async signUpUser(userData: CreateUserDto) {
        try {
            let response = await repo.create(userData);
            const token = generateToken(response);
            const responseToBeSent = {...response,token};
            return responseToBeSent;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async loginUser(userData: {email:string,password:string}) {
        try {
            let response = await repo.signIn(userData);
            const token = generateToken(response);
            const responseToBeSent = {...response,token};
            return responseToBeSent;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default AuthService;
