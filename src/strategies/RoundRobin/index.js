import Strategy from "../Strategy";
import request from "../../client";

class RoundRobinStrategy extends Strategy {
	constructor(servers) {
		super(servers);

		this.currentRequestNumber = 0;
	}

	async handleRequest(req, res) {
		const serverUrl = this.servers[this.currentRequestNumber].URL;

		await request(req, res, {
			url: serverUrl + req.url
		});

		this.currentRequestNumber =
			(this.currentRequestNumber + 1) % this.servers.length;
	}
}

export default RoundRobinStrategy;
