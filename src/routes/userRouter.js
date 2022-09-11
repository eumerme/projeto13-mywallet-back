import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation.js';
import {
	createTransaction,
	getTransactions,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/transactions', tokenValidation, createTransaction);
userRouter.get('/transactions', tokenValidation, getTransactions);

export { userRouter };
