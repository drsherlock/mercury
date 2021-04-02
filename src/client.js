import axios from "axios";

const request = async (req, res, requestOptions) => {
	const targetResponse = await axios({
		responseType: "stream",
		...requestOptions
	});
	targetResponse.data.pipe(res);
};

export default request;
