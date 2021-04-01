import request from "request";

import Strategy from "../Strategy";

class RandomStrategy extends Strategy {
	constructor(servers) {
		super(servers);
	}

	async handleRequest(req, res) {
		const numOfServers = this.servers.length;
		const randomServer = Math.floor(Math.random() * numOfServers);
		const serverUrl = this.servers[randomServer].URL;

		await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
	}
}

export default RandomStrategy;
