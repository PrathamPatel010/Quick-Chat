import UserService from "../services/user-service";
import {NextFunction, Request, Response} from "express";

const userService = new UserService();

async function searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await userService.searchUsers(req.query as {username:string},req?.user?.id);
        return res.status(200).json({
            message: `${response.length} Users fetched successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

export default {searchUsers};