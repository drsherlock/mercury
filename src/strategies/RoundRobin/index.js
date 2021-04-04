import Strategy from "../Strategy";
import request from "../../client";

class RoundRobinStrategy extends Strategy {
	constructor(servers) {
		super(servers);

		this.currentRequestNumber = 0;
	}

	async handleRequest(req, res, next) {
		const serverUrl = this.servers[this.currentRequestNumber].URL;

		try {
			await request(req, res, {
				url: serverUrl + req.url
			});
		} catch (err) {
			next(err);
		}

		this.currentRequestNumber =
			(this.currentRequestNumber + 1) % this.servers.length;
	}
}

export default RoundRobinStrategy;
