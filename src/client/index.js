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
		url: url,
		method: method
	});
	return response;
};

export default { forwardRequest, createRequest };
