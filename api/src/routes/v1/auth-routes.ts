import express from 'express';
import AuthController from '../../controller/auth-controller';

const router = express.Router();

router.post('/signup',AuthController.signUp);

export default router;