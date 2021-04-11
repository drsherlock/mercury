import Strategy from "../Strategy";
import client from "../../client";

class RoundRobinStrategy extends Strategy {
	constructor(servers) {
		super(servers);

		this.currentRequestNumber = 0;
	}

	handleRequest = async (req, res, next) => {
		const serverUrl = this.servers[this.currentRequestNumber].URL;

		try {
			await client.forwardRequest(req, res, {
				url: serverUrl + req.url
			});
		} catch (err) {
			next(err);
		}

		this.currentRequestNumber =
			(this.currentRequestNumber + 1) % this.servers.length;
	};
}

export default RoundRobinStrategy;
