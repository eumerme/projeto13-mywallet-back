import { Router } from "express";
import { tokenValidation, validateBody, validateParams } from "../middlewares/index.js";
import { postTransaction, getTransactions, deleteTransaction, updateTransaction } from "../controllers/index.js";
import { createTransactionBody, transactionParams, updateTransactionBody } from "../schemas/index.js";

const transactionsRouter = Router();

transactionsRouter
	.all("/*", tokenValidation)
	.post("/transactions", validateBody(createTransactionBody), postTransaction)
	.get("/transactions", getTransactions)
	.patch("/transactions/:id", validateBody(updateTransactionBody), validateParams(transactionParams), updateTransaction)
	.delete("/transactions/:id", validateParams(transactionParams), deleteTransaction);

export { transactionsRouter };
