import Joi from "joi";

const signupBody = Joi.object()
	.keys({
		name: Joi.string().trim().required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().min(6).trim().required(),
		confirmPassword: Joi.ref("password"),
	})
	.with("password", "confirmPassword");

const loginBody = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	password: Joi.string().trim().required(),
});

const transactionBody = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	date: Joi.string().trim().required(),
	value: Joi.number().required(),
	description: Joi.string().trim().required(),
	type: Joi.string().valid("credit", "debit").required(),
});

const transactionParams = Joi.object().keys({
	id: Joi.string().trim().required(),
});
export { signupBody, loginBody, transactionBody, transactionParams };
