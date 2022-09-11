import Joi from 'joi';

const schemas = {
	signupPOST: Joi.object()
		.keys({
			name: Joi.string().trim().required(),
			email: Joi.string().trim().email().required(),
			password: Joi.string().min(3).trim().required(),
			confirmPassword: Joi.ref('password'),
		})
		.with('password', 'confirmPassword'),
	loginPOST: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().required(),
	}),
	transactionsPOST: Joi.object().keys({
		email: Joi.string().trim().email().required(),
		date: Joi.string().trim().required(),
		value: Joi.number().required(),
		description: Joi.string().trim().required(),
		type: Joi.string().valid('credit', 'debit').required(),
	}),
	//tentar validar o token
};

export { schemas };
