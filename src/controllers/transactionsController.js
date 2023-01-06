import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { httpStatus } from "../enums/httpStatus.js";
import { collection } from "../enums/collections.js";

async function createTransaction(req, res) {
	const body = req.body;

	try {
		await db.collection(collection.TRANSACTIONS).insertOne(body);

		return res.status(httpStatus.CREATED).send({ message: "Valor inserido com sucesso." });
	} catch (err) {
		return res.status(httpStatus.SERVER_ERROR).send(err.message);
	}
}

async function getTransactions(req, res) {
	const { user } = res.locals;
	try {
		const transactions = await db.collection(collection.TRANSACTIONS).find({ email: user.email }).toArray();

		transactions.forEach((transaction) => delete transaction.email);

		return res.status(httpStatus.OK).send(transactions);
	} catch (err) {
		return res.status(httpStatus.SERVER_ERROR).send(err.message);
	}
}

async function deleteTransaction(req, res) {
	const { id } = req.params;

	try {
		await db.collection(collection.TRANSACTIONS).deleteOne({ _id: new ObjectId(id) });

		return res.sendStatus(httpStatus.OK);
	} catch (err) {
		return res.status(httpStatus.SERVER_ERROR).send(err.message);
	}
}

export { createTransaction, getTransactions, deleteTransaction };
