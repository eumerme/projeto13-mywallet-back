import { schemas } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { authService } from "../services/authService.js";

async function signUp(req, res) {
	const user = req.body;
	const { value, error } = schemas.signupPOST.validate(user, {
		abortEarly: false,
	});

	if (error) {
		const message = error.details
			.map((detail) => detail.message)
			.join(",")
			.replace("[ref:password]", "equal to password");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	try {
		delete user.confirmPassword;

		await authService.postUser(user);

		return res.sendStatus(STATUS_CODE.CREATED);
	} catch (err) {
		if (err.name === "ConflictError") {
			return res.sendStatus(httpStatus.CONFLICT);
		}
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function signIn(req, res) {
	const { email, password } = req.body;
	const { value, error } = schemas.loginPOST.validate({ email, password }, { abortEarly: false });
	if (error) {
		const message = error.details.map((detail) => detail.message).join(",");
		return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
	}

	try {
		const userData = await authService.logIn({ email, password });
		return res.status(STATUS_CODE.OK).send(userData);
	} catch (err) {
		if (err.name === "UnauthorizedError") {
			return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
		}
		if (err.name === "NotFoundError") {
			return res.sendStatus(STATUS_CODE.NOT_FOUND);
		}
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

async function signOut(req, res) {
	const { token } = res.locals;

	try {
		await authService.logOut(token);
		return res.sendStatus(STATUS_CODE.OK);
	} catch (err) {
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}
}

export { signUp, signIn, signOut };
