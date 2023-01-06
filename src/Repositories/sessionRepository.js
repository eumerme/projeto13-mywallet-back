import { db } from "../database/db.js";
import { collection } from "../enums/collections.js";

async function createSession(data) {
	return db.collection(collection.SESSIONS).insertOne(data);
}

async function deleteSession(token) {
	return db.collection(collection.SESSIONS).deleteOne(token);
}

export const sessionRepository = { createSession, deleteSession };
