import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { schemas } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTION } from "../enums/collections.js";

async function createTransaction(req, res) {
	const { value, error } = schemas.transactionsPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	try {
		await db.collection(COLLECTION.TRANSACTIONS).insertOne({ ...req.body });

		return res
			.status(STATUS_CODE.CREATED)
			.send({ message: "Valor inserido com sucesso." });
	} catch (err) {
		return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
	}
}

async function getTransactions(req, res) {
	const { user } = res.locals;
	try {
		const transactions = await db
			.collection(COLLECTION.TRANSACTIONS)
			.find({ email: user.email })
			.toArray();

		transactions.forEach((transaction) => delete transaction.email);

		return res.status(STATUS_CODE.OK).send(transactions);
	} catch (err) {
		return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
	}
}

async function deleteTransaction(req, res) {
	const { user: transactionId } = req.headers;
	try {
		await db
			.collection(COLLECTION.TRANSACTIONS)
			.deleteOne({ _id: new ObjectId(transactionId) });

		return res.sendStatus(STATUS_CODE.OK);
	} catch (err) {
		return res.status(STATUS_CODE.SERVER_ERROR).send(err.message);
	}
}

export { createTransaction, getTransactions, deleteTransaction };
