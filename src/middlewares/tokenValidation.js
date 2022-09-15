import { db } from '../database/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTION } from '../enums/collections.js';

export default async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace('Bearer ', '');
	if (!token) {
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	const session = await db.collection(COLLECTION.SESSIONS).findOne({ token });
	if (!session) {
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	const user = await db.collection(COLLECTION.USERS).findOne({
		_id: session.userId,
	});
	if (!user) {
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	delete user.password;

	res.locals.token = token;
	res.locals.user = user;

	next();
}
