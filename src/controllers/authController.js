import bcrypt from 'bcrypt';
import { db } from '../database/db.js';
import { schemas } from '../schemas/schemas.js';
import { v4 as uuid } from 'uuid';

async function signup(req, res) {
	const user = req.body;
	const { value, error } = schemas.signupPOST.validate(user, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details
			.map((detail) => detail.message)
			.join(',')
			.replace('[ref:password]', 'equal to password');
		return res.status(422).send({ message });
	}

	const userExists = await db
		.collection('users')
		.findOne({ email: user.email });
	if (userExists) {
		return res.status(409).send({ message: 'Usuário já cadastrado.' });
	}

	const passwordHash = bcrypt.hashSync(user.password, 10);

	try {
		delete user.confirmPassword;

		await db.collection('users').insertOne({ ...user, password: passwordHash });

		return res.status(201).send({ message: 'Cadastro criado com sucesso.' });
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	const { value, error } = schemas.loginPOST.validate(
		{ email, password },
		{ abortEarly: false }
	);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(',');
		return res.status(422).send({ message });
	}

	try {
		const user = await db.collection('users').findOne({ email });
		if (!user) {
			return res.sendStatus(404);
		}

		const isValid = bcrypt.compareSync(password, user.password);
		if (user && isValid) {
			const token = uuid();

			await db.collection('sessions').insertOne({
				userId: user._id,
				token,
			});

			return res.status(200).send({ name: user.name, token, email });
		} else {
			return res.status(401).send({ message: 'Email ou senha incorretos.' });
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

async function logout(req, res) {
	const { token } = res.locals;
	try {
		await db.collection('sessions').deleteOne({ token });

		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

export { signup, login, logout };
