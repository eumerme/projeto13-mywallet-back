import { transactionsRepository } from "../Repositories/index.js";
import { notFoundError } from "../errors/index.js";

async function createTransaction(body) {
	return transactionsRepository.insertTransaction(body);
}

async function findTransactions(email) {
	const transactions = await transactionsRepository.findTransactionsToArray({ email });

	transactions.forEach((transaction) => delete transaction.email);

	return transactions;
}

async function deleteOneTransaction(id) {
	const transactionExists = await transactionsRepository.findOneTransactionById({ id });
	if (!transactionExists) {
		throw notFoundError();
	}

	return transactionsRepository.deleteOneTransactionById(id);
}

export const transactionsService = { createTransaction, findTransactions, deleteOneTransaction };
