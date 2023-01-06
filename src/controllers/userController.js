import { httpStatus } from "../enums/index.js";
import { userService } from "../services/index.js";

async function signUp(req, res) {
	const user = req.body;
	delete user.confirmPassword;

	try {
		await userService.postUser(user);

		return res.sendStatus(httpStatus.CREATED);
	} catch (err) {
		if (err.name === "ConflictError") {
			return res.sendStatus(httpStatus.CONFLICT);
		}
		return res.sendStatus(httpStatus.SERVER_ERROR);
	}
}

async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const userData = await userService.logIn({ email, password });
		return res.status(httpStatus.OK).send(userData);
	} catch (err) {
		if (err.name === "UnauthorizedError") {
			return res.sendStatus(httpStatus.UNAUTHORIZED);
		}
		if (err.name === "NotFoundError") {
			return res.sendStatus(httpStatus.NOT_FOUND);
		}
		return res.sendStatus(httpStatus.SERVER_ERROR);
	}
}

async function signOut(req, res) {
	const { token } = res.locals;

	try {
		await userService.logOut(token);
		return res.sendStatus(httpStatus.OK);
	} catch (err) {
		return res.sendStatus(httpStatus.SERVER_ERROR);
	}
}

export { signUp, signIn, signOut };
