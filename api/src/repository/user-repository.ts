import {CreateUserDto, LoginUserDto} from "../dto/user-dto";
import prismaService from "../config/dbConfig";
import {BadRequestError, NotFoundError} from "../utils/AppError";
import argon2 from "argon2";


class UserRepository {
    async searchUsers(filter:{username:string},loggedInUserId:number){
        try {
            const users = await prismaService.user.findMany({
                where:{
                    username:{
                        startsWith:filter.username,
                        mode:'insensitive'
                    },
                    NOT:{
                        id:loggedInUserId
                    }
                }
            });
            return users;
        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }

    async userExist(userData:{username?:string,email?:string}){
        const userExist = await prismaService.user.findFirst({
            where:{
                OR:[
                    {username:userData?.username},
                    {email:userData?.email}
                ]
            }
        });
        if (userExist){
            return userExist;
        }
    }

    async create(userData: CreateUserDto) {
        try {
            const userExist = await this.userExist(userData);
            if (userExist){
                throw new BadRequestError("User already exist!!");
            }
            userData.password = await argon2.hash(userData.password);
            const user = await prismaService.user.create({
                data:userData,
                select:{
                    id:true,email:true,username:true,pic:true,isVerified:true
                }
            });
            return user;
        } catch (error) {
            if (error instanceof BadRequestError){
                throw error;
            }
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }


    async signIn(userData:LoginUserDto){
        try {
            const userExist = await this.userExist(userData);
            if (!userExist){
                throw new NotFoundError("No User found with given email");
            }
            const passCheck = await argon2.verify(userExist.password,userData.password);
            if (!passCheck){
                throw new BadRequestError("Wrong credentials");
            }
            const userInfo = {id:userExist.id,username:userExist.username,email:userExist.email,pic:userExist.pic,isVerified:userExist.isVerified};
            return userInfo;
        } catch (error) {
            if (error instanceof BadRequestError){
                throw error;
            }
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }
}

export default UserRepository;
