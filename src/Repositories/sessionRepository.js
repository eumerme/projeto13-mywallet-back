import { db } from "../database/db.js";
import { collection } from "../enums/index.js";

async function createSession(data) {
	return db.collection(collection.SESSIONS).insertOne(data);
}

async function deleteSession(token) {
	return db.collection(collection.SESSIONS).deleteOne(token);
}

async function findSession(token) {
	return db.collection(collection.SESSIONS).findOne(token);
}

export const sessionRepository = { createSession, deleteSession, findSession };
