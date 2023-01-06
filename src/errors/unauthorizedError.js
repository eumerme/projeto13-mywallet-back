export function unauthorizedError(message) {
	return {
		name: "UnauthorizedError",
		message,
	};
}
