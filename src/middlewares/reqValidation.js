import { httpStatus } from "../enums/httpStatus.js";

function validate(schema, type) {
	return (req, res, next) => {
		const { error } = schema.validate(req[type], {
			abortEarly: false,
		});

		if (error) {
			let message = error.details.map((detail) => detail.message).join(",");

			const { path } = req.route;
			if (path === "/signup") {
				message = message.replace(`"confirmPassword" must be [ref:password]`, `As senhas devem ser iguais`);
			}

			return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message });
		}

		next();
	};
}

export function validateBody(schema) {
	return validate(schema, "body");
}

export function validateParams(schema) {
	return validate(schema, "params");
}
