import { db } from '../database/db.js';
import { schemas } from '../schemas/schemas.js';

async function createTransaction(req, res) {
	const { value, error } = schemas.transactionsPOST.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		const message = error.details.map((detail) => detail.message).join(',');
		return res.status(422).send({ message });
	}

	try {
		await db.collection('transactions').insertOne({ ...req.body });

		return res.status(201).send({ message: 'Valor inserido com sucesso.' });
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

async function getTransactions(req, res) {
	const { user } = res.locals;
	try {
		const transactions = await db
			.collection('transactions')
			.find({ email: user.email })
			.toArray();

		return res.status(200).send(transactions);
	} catch (err) {
		return res.status(500).send(err.message);
	}
}

export { createTransaction, getTransactions };
