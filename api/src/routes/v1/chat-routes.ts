import express from 'express';
import authenticateUser from "../../middlewares/auth-middleware";
import ChatController from "../../controller/chat-controller";


const router = express.Router();

router.post('/',authenticateUser,ChatController.createOrAccessChat);
router.get('/',authenticateUser,ChatController.fetchChats);
router.post('/group',authenticateUser,ChatController.createGroupChat)
router.post('/group/add',authenticateUser,ChatController.addToGroup);
router.post('/group/remove',authenticateUser,ChatController.removeFromGroup);
router.patch('/group/rename',authenticateUser,ChatController.renameGroup);

export default router;