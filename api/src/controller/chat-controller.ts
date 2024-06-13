import { Request, Response, NextFunction } from 'express';
import ChatService from "../services/chat-service";
const chatService = new ChatService();

//@description     To Create or fetch Peer-to-Peer Chat
//@route           POST /api/chats/
//@access          Protected
async function createOrAccessChat(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await chatService.createOrAccessChat(req?.user?.id,req.body.userId);
        return res.status(201).json({
            message: `Chats accessed successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}
export default {createOrAccessChat };
