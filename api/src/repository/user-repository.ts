import {CreateUserDto} from "../dto/user-dto";


class UserRepository {
    async create(userData: CreateUserDto) {
        try {

        } catch (error) {
            console.log("Error occurred at user repository layer ", (error as Error).message);
            throw error;
        }
    }
}

export default UserRepository;
