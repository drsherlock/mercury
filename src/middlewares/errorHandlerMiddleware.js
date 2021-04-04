export const errorHandlerMiddleware = (err, req, res, next) => {
	if (err.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(err.response.data);
		console.log(err.response.status);
		console.log(err.response.headers);
		res.status(err.response.status).send(err.response.data);
	} else if (err.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.log(err.message);
		res.status(500).send(err.message);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log("Error", err.message);
		res.status(500);
	}
	console.log(err.config);
};
