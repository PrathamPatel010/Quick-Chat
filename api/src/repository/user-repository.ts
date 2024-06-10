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

    async userExist(userData: any) {
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

}

export default UserRepository;
