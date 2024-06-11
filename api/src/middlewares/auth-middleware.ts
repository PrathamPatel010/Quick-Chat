import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request as ExpressRequest, Response, NextFunction } from 'express'; // Import ExpressRequest alias
import { User } from 'types';
import {JWT_SECRET} from "../config/serverConfig";
import {NotFoundError} from "../utils/AppError";

const prismaService = new PrismaClient();

const authenticateUser = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    if(!req?.headers?.authorization?.startsWith("Bearer")){
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        let token = req.headers.authorization.split(" ")[1];
        const payload: any = jwt.verify(token, JWT_SECRET);
        const user = await prismaService.user.findUnique({
            where: { id: payload.userId },
            select: { id:true,email:true,username:true,pic:true,isAdmin:true,isVerified:true }
        });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        req.user = user as User;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
};

export default authenticateUser;
