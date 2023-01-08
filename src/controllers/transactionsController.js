import { transactionsService } from "../services/index.js";
import { created, notFound, ok, serverError } from "../utils/resReturn.js";

async function postTransaction(req, res) {
	const body = req.body;

	try {
		await transactionsService.createTransaction(body);
		return created(res);
	} catch (err) {
		return serverError(res);
	}
}

async function getTransactions(req, res) {
	const { user } = res.locals;

	try {
		const transactions = await transactionsService.findTransactions(user.email);
		return ok(res, transactions);
	} catch (err) {
		return serverError(res);
	}
}

async function deleteTransaction(req, res) {
	const { id } = req.params;

	try {
		await transactionsService.deleteOneTransaction(id);
		return ok(res);
	} catch (err) {
		if (err.name === "NotFoundError") {
			return notFound(res);
		}
		return serverError(res);
	}
}

export { postTransaction, getTransactions, deleteTransaction };
