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

    async get(email){
        try{
            const user = await prismaService.user.findUnique({
                where:{
                    email:email
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