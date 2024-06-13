import express from 'express';
import authenticateUser from "../../middlewares/auth-middleware";
import UserController from "../../controller/user-controller";


const router = express.Router();

router.get('/',authenticateUser,UserController.searchUsers);

export default router;