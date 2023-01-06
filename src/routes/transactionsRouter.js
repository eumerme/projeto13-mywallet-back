import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { createTransaction, getTransactions, deleteTransaction } from "../controllers/transactionsController.js";
import { validateBody, validateParams } from "../middlewares/reqValidation.js";
import { transactionBody, transactionParams } from "../schemas/schemas.js";

const transactionsRouter = Router();

transactionsRouter
	.all("/*", tokenValidation)
	.post("/transactions", validateBody(transactionBody), createTransaction)
	.get("/transactions", getTransactions)
	.delete("/transactions/:id", validateParams(transactionParams), deleteTransaction);

export { transactionsRouter };
