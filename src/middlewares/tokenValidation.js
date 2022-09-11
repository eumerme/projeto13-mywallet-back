import { db } from '../database/db.js';

export default async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace('Bearer ', '');
	if (!token) {
		return res.sendStatus(401);
	}

	const session = await db.collection('sessions').findOne({ token });
	if (!session) {
		return res.sendStatus(401);
	}

	const user = await db.collection('users').findOne({
		_id: session.userId,
	});
	if (!user) {
		return res.sendStatus(401);
	}

	delete user.password;

	res.locals.token = token;
	res.locals.user = user;

	next();
}