import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
	db = mongoClient.db('mywallet');
});

const schema = {
	signupPOST: Joi.object()
		.keys({
			name: Joi.string().trim().required(),
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().required(),
			confirmPassword: Joi.string().trim().required(),
		})
		.with('password', 'confirmPassword'),
	loginPOST: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	}),
	financesPOST: Joi.object().keys({
		date: Joi.string().trim().required(),
		value: Joi.number().required(),
		description: Joi.string().trim().required(),
		type: Joi.string().valid('income', 'outcome').required(),
	}),
};

app.post('/signup', async (req, res) => {
	const { value, error } = schema.signupPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details.map((detail) => detail.message).join(',');
		return res.status(422).send(message);
	}

	const passwordHash = bcrypt.hashSync(user.password, 10);

	try {
		delete user.confirmPassword;

		await db.collection('users').insertOne({ ...user, password: passwordHash });
		res.sendStatus(201);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const { value, error } = schema.loginPOST.validate(
		{ email, password },
		{ abortEarly: false }
	);
	if (error) {
		const message = error.details.map((detail) => detail.message).join(',');
		return res.status(422).send(message);
	}

	try {
		const user = await db.collection('users').findOne({ email });
		if (!user) {
			return res.sendStatus(404);
		}

		const isValid = bcrypt.compareSync(password, user.password);
		if (isValid) {
			const token = uuid();
			await db.collection('sessions').insertOne({
				userId: user._id,
				token,
			});
			return res.status(200).send({ name: user.name, token });
		} else {
			return res.status(401).send('Email ou senha incorretos.');
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

app.post('/finances', async (req, res) => {
	const { value, error } = schema.financesPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details.map((detail) => detail.message).join(',');
		return res.status(422).send(message);
	}

	const token = req.headers.authorization?.replace('Bearer', '');
	if (!token) {
		return res.sendStatus(401);
	}

	try {
		const session = await db.collection('sessions').findOne({ token });
		if (!session) {
			return res.sendStatus(401);
		}

		const user = await db.collection('users').findOne({ _id: session.userId });
		if (user) {
			await db.collection('finances').insertOne({ ...req.body });
			return res.sendStatus(201);
		} else {
			return res.sendStatus(404);
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

app.get('/finances', async (req, res) => {
	const token = req.headers.authorization?.replace('Bearer', '');
	if (!token) {
		return res.sendStatus(401);
	}

	try {
		const session = await db.collection('sessions').findOne({ token });
		if (!session) {
			return res.sendStatus(401);
		}

		const user = await db.collection('users').findOne({ _id: session.userId });
		if (user) {
			const finances = await db.collection('finances').find().toArray();
			return res.status(200).send(finances);
		} else {
			return res.sendStatus(404);
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

app.listen(5000, () => console.log('Listening on port 5000'));
