import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation.js';
import { login, logout, signup } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', tokenValidation, logout);

export { authRouter };
