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

export { signupBody, loginBody };
