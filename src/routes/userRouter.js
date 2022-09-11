import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation.js';
import {
	createTransaction,
	getTransactions,
	deleteTransaction,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/transactions', tokenValidation, createTransaction);
userRouter.get('/transactions', tokenValidation, getTransactions);
userRouter.delete('/transactions', deleteTransaction);

export { userRouter };
