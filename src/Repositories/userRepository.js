import { db } from "../database/db.js";
import { collection } from "../enums/index.js";

async function createUser(user) {
	return db.collection(collection.USERS).insertOne(user);
}

async function findUserByEmail(email) {
	return db.collection(collection.USERS).findOne(email);
}

async function findUserById(id) {
	return db.collection(collection.USERS).findOne({ _id: id });
}

export const userRepository = { createUser, findUserByEmail, findUserById };
