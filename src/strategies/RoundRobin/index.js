import request from "request";

import Strategy from "../Strategy";

class RoundRobinStrategy extends Strategy {
	constructor(servers) {
		super(servers);

		this.currentRequestNumber = 0;
	}

	async handleRequest(req, res) {
		const serverUrl = this.servers[this.currentRequestNumber].URL;

		await req.pipe(request({ url: serverUrl + req.url })).pipe(res);

		this.currentRequestNumber =
			(this.currentRequestNumber + 1) % this.servers.length;
	}
}

export default RoundRobinStrategy;
