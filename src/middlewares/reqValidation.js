import { unprocessableEntity } from "../utils/resReturn.js";

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

			return unprocessableEntity(res, message);
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
