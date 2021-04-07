import axios from "axios";

const forwardRequest = async (req, res, requestOptions) => {
	const targetResponse = await axios({
		responseType: "stream",
		...requestOptions
	});
	targetResponse.data.pipe(res);
};

const createRequest = async (url, method) => {
	const response = await axios({
		method: method,
		url: url
	});
	return response;
};

export { forwardRequest, createRequest };
