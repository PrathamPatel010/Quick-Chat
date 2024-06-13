import express from 'express';
import authenticateUser from "../../middlewares/auth-middleware";
import ChatController from "../../controller/chat-controller";


const router = express.Router();

router.post('/',authenticateUser,ChatController.createOrAccessChat);

export default router;