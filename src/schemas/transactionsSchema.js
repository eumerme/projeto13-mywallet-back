import Joi from "joi";

const createTransactionBody = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	date: Joi.string().trim().required(),
	value: Joi.number().required(),
	description: Joi.string().trim().required(),
	type: Joi.string().valid("credit", "debit").required(),
});

const updateTransactionBody = Joi.object().keys({
	date: Joi.string().trim().required(),
	value: Joi.number().required(),
	description: Joi.string().trim().required(),
});

const transactionParams = Joi.object().keys({
	id: Joi.string().trim().required(),
});

export { createTransactionBody, updateTransactionBody, transactionParams };
