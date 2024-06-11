import UserRepository from "../repository/user-repository";

const repo = new UserRepository();

class UserService{
    async searchUsers(filter:{username:string},userId:string|undefined){
        try {
            const users = await repo.getAll(filter,userId);
            return users;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default UserService;