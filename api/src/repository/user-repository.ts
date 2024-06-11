import { PrismaClient } from '@prisma/client';
import {CreateUserDto} from "../dto/user-dto";

const prismaService = new PrismaClient();

class UserRepository {
    async create(userData: CreateUserDto) {
        try {
            const user = await prismaService.user.create({
                data: userData
            });
            return user;
        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }

    async userExist(userData:any) {
        try {
            const { email, username } = userData;
            const user = await prismaService.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username },
                    ]
                }
            });
            return user;
        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }

    async getAll(filter:{username:string},userId:string | undefined){
        try {
            const users = await prismaService.user.findMany({
                where:{
                    username: {
                        startsWith: filter.username,
                        mode:'insensitive'  // for ignoring case
                    },
                    NOT:{
                        id: userId,
                    }
                }
            });
            return users;
        } catch (error) {
            console.log(`Error occurred at user repository layer ${(error as Error)}.message`.red);
            throw error;
        }
    }

}

export default UserRepository;
