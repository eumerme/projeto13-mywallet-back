import { sessionRepository, userRepository } from "../Repositories/index.js";
import { unauthorized } from "../utils/resReturn.js";

export async function tokenValidation(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	if (!token) {
		return unauthorized(res);
	}

	const session = await sessionRepository.findSession({ token });
	if (!session) {
		return unauthorized(res);
	}

	const user = await userRepository.findUserById(session.userId);
	if (!user) {
		return unauthorized(res);
	}

	delete user.password;
	res.locals.token = token;
	res.locals.user = user;

	next();
}
