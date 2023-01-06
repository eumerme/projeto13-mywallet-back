import { Router } from "express";
import { tokenValidation, validateBody, validateParams } from "../middlewares/index.js";
import { postTransaction, getTransactions, deleteTransaction } from "../controllers/index.js";
import { transactionBody, transactionParams } from "../schemas/index.js";

const transactionsRouter = Router();

transactionsRouter
	.all("/*", tokenValidation)
	.post("/transactions", validateBody(transactionBody), postTransaction)
	.get("/transactions", getTransactions)
	.delete("/transactions/:id", validateParams(transactionParams), deleteTransaction);

export { transactionsRouter };
