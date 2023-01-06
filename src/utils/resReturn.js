import { httpStatus } from "../enums/index.js";

function unauthorized(res) {
	return res.sendStatus(httpStatus.UNAUTHORIZED);
}

function conflict(res) {
	return res.sendStatus(httpStatus.CONFLICT);
}

function created(res) {
	return res.sendStatus(httpStatus.CREATED);
}

function notFound(res) {
	return res.sendStatus(httpStatus.NOT_FOUND);
}

function serverError(res) {
	return res.sendStatus(httpStatus.SERVER_ERROR);
}

function unprocessableEntity(res, message) {
	return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message });
}

function ok(res, data = null) {
	if (data) {
		return res.status(httpStatus.OK).send(data);
	} else {
		return res.sendStatus(httpStatus.OK);
	}
}

export { unauthorized, conflict, created, notFound, serverError, unprocessableEntity, ok };
