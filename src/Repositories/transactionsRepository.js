import { ObjectId } from "mongodb";
import { db } from "../database/db.js";
import { collection } from "../enums/index.js";

async function insert(data) {
	return db.collection(collection.TRANSACTIONS).insertOne(data);
}

async function findToArray(email) {
	return db.collection(collection.TRANSACTIONS).find(email).toArray();
}

async function findOneById(id) {
	return db.collection(collection.TRANSACTIONS).findOne({ _id: new ObjectId(id) });
}

async function updateOneById(id, data) {
	return db.collection(collection.TRANSACTIONS).updateOne({ _id: new ObjectId(id) }, { $set: data });
}

async function deleteOneById(id) {
	return db.collection(collection.TRANSACTIONS).deleteOne({ _id: new ObjectId(id) });
}

export const transactionsRepository = {
	insert,
	findToArray,
	findOneById,
	updateOneById,
	deleteOneById,
};
