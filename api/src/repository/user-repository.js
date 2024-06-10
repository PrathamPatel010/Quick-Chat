const {PrismaClient} = require('@prisma/client')
const prismaService = new PrismaClient();

class UserRepository{
    async create(userData){
        try{
            const user = await prismaService.user.create({
                data:userData
            });
            return user;
        } catch (error){
            console.log("Error occurred at user repository layer ", error.message);
            throw error;
        }
    }

    async userExist(userData){
        try{
            const {email,username} = userData;
            const user = await prismaService.user.findFirst({
                where:{
                    OR:[
                        {email},
                        {username},
                    ]
                }
            });
            return user;
        } catch (error){
            console.log("Error occurred at user repository layer ", error.message);
            throw error;
        }
    }

}

module.exports = UserRepository;