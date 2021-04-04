import axios from "axios";

const request = async (req, res, requestOptions) => {
	try {
		const targetResponse = await axios({
			responseType: "stream",
			...requestOptions
		});
		targetResponse.data.pipe(res);
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			res.status(error.response.status).send(error.response.data);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.message);
			res.status(500).send(error.message);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log("Error", error.message);
			res.status(500);
		}
		console.log(error.config);
	}
};

export default request;
