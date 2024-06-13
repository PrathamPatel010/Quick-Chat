import { Request, Response, NextFunction } from 'express';
import UserService from "../services/user-service";
const userService = new UserService();
async function searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await userService.searchUsers(req.query,req?.user?.id);
        return res.status(201).json({
            message: `${response.length} Users fetched successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}
export default { searchUsers };
