import logger from "../logger";

export const errorHandlerMiddleware = (err, req, res, next) => {
	if (err.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		logger.error(
			`${err.response.status} - ${err.response.data} -  ${err.response.headers} - ${req.originalUrl} - ${req.method} - ${req.ip}`
		);

		res.status(err.response.status).send(err.response.data);
	} else if (err.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		logger.error(
			`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
		);

		res.status(500).send(err.message);
	} else {
		// Something happened in setting up the request that triggered an Error
		logger.error(
			`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
		);

		res.status(500);
	}
};
