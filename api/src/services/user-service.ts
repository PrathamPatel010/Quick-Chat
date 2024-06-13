import UserRepository from '../repository/user-repository';
import 'colors';

const repo = new UserRepository();

class UserService {
    async searchUsers(filter,loggedInUserId) {
        try {
            const users = await repo.searchUsers(filter,loggedInUserId);
            return users;
        } catch (error) {
            console.log(`Error occurred at user service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default UserService;
