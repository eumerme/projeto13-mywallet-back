import { db } from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";

async function createSession(data) {
	return db.collection(COLLECTION.SESSIONS).insertOne(data);
}

async function deleteSession(token) {
	return db.collection(COLLECTION.SESSIONS).deleteOne(token);
}

export const sessionRepository = { createSession, deleteSession };
