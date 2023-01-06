import { userService } from "../services/index.js";
import { conflict, created, notFound, ok, serverError, unauthorized } from "../utils/resReturn.js";

async function signUp(req, res) {
	const user = req.body;
	delete user.confirmPassword;

	try {
		await userService.postUser(user);

		return created(res);
	} catch (err) {
		if (err.name === "ConflictError") {
			return conflict(res);
		}
		return serverError(res);
	}
}

async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const userData = await userService.logIn({ email, password });
		return ok(res, userData);
	} catch (err) {
		if (err.name === "UnauthorizedError") {
			return unauthorized(res);
		}
		if (err.name === "NotFoundError") {
			return notFound(res);
		}
		return serverError(res);
	}
}

async function signOut(req, res) {
	const { token } = res.locals;

	try {
		await userService.logOut(token);
		return ok(res);
	} catch (err) {
		return serverError(res);
	}
}

export { signUp, signIn, signOut };
