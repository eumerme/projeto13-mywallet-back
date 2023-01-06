import { db } from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";

async function createUser(user) {
	return db.collection(COLLECTION.USERS).insertOne(user);
}

async function findUserByEmail(email) {
	return db.collection(COLLECTION.USERS).findOne(email);
}

export const userRepository = { createUser, findUserByEmail };
