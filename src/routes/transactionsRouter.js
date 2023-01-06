import { Router } from "express";
import { tokenValidation, validateBody, validateParams } from "../middlewares/index.js";
import { createTransaction, getTransactions, deleteTransaction } from "../controllers/index.js";
import { transactionBody, transactionParams } from "../schemas/index.js";

const transactionsRouter = Router();

transactionsRouter
	.all("/*", tokenValidation)
	.post("/transactions", validateBody(transactionBody), createTransaction)
	.get("/transactions", getTransactions)
	.delete("/transactions/:id", validateParams(transactionParams), deleteTransaction);

export { transactionsRouter };
