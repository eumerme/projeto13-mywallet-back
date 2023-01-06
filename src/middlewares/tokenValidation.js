import { db } from "../database/db.js";
import { collection, httpStatus } from "../enums/index.js";

export async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) {
		return res.sendStatus(httpStatus.UNAUTHORIZED);
	}

	const session = await db.collection(collection.SESSIONS).findOne({ token });
	if (!session) {
		return res.sendStatus(httpStatus.UNAUTHORIZED);
	}

	const user = await db.collection(collection.USERS).findOne({
		_id: session.userId,
	});
	if (!user) {
		return res.sendStatus(httpStatus.UNAUTHORIZED);
	}

	delete user.password;

	res.locals.token = token;
	res.locals.user = user;

	next();
}
