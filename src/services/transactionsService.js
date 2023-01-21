import { transactionsRepository } from "../Repositories/index.js";
import { notFoundError, unauthorizedError } from "../errors/index.js";

async function createTransaction(body) {
	return transactionsRepository.insert(body);
}

async function findTransactions(email) {
	const transactions = await transactionsRepository.findToArray({ email });

	transactions.forEach((transaction) => delete transaction.email);

	return transactions;
}

async function updateOneTransaction(id, user, data) {
	const transactionExists = await transactionsRepository.findOneById(id);
	if (!transactionExists) {
		throw notFoundError();
	}

	if (transactionExists.email !== user.email) {
		throw unauthorizedError();
	}

	return transactionsRepository.updateOneById(id, data);
}

async function deleteOneTransaction(id) {
	const transactionExists = await transactionsRepository.findOneById(id);
	if (!transactionExists) {
		throw notFoundError();
	}

	return transactionsRepository.deleteOneById(id);
}

export const transactionsService = { createTransaction, findTransactions, updateOneTransaction, deleteOneTransaction };
