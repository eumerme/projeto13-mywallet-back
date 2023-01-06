import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { collection } from "../enums/index.js";

async function insertTransaction(data) {
	return db.collection(collection.TRANSACTIONS).insertOne(data);
}

async function findTransactionsToArray(email) {
	return db.collection(collection.TRANSACTIONS).find(email).toArray();
}

async function findOneTransactionById(id) {
	return db.collection(collection.TRANSACTIONS).findOne(id);
}

async function deleteOneTransactionById(id) {
	return db.collection(collection.TRANSACTIONS).deleteOne({ _id: new ObjectId(id) });
}

export const transactionsRepository = {
	insertTransaction,
	findTransactionsToArray,
	findOneTransactionById,
	deleteOneTransactionById,
};
