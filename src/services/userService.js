import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sessionRepository, userRepository } from "../Repositories/index.js";
import { conflictError, notFoundError, unauthorizedError } from "../errors/index.js";

async function postUser(user) {
	const userExists = await userRepository.findUserByEmail({ email: user.email });
	if (userExists) {
		throw conflictError("Usuário já cadastrado");
	}

	const passwordHash = bcrypt.hashSync(user.password, 10);

	return userRepository.createUser({ ...user, password: passwordHash });
}

async function logIn({ email, password }) {
	const user = await userRepository.findUserByEmail({ email });
	if (!user) {
		throw notFoundError();
	}

	const isValid = bcrypt.compareSync(password, user.password);
	if (!isValid) {
		throw unauthorizedError("Email ou senha incorretos");
	}

	const token = uuid();
	await sessionRepository.createSession({
		userId: user._id,
		token,
	});

	return { name: user.name, token, email };
}

async function logOut({ token }) {
	return sessionRepository.deleteSession({ token });
}

export const userService = { postUser, logIn, logOut };
