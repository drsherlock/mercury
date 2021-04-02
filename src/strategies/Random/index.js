import Strategy from "../Strategy";
import request from "../../client";

class RandomStrategy extends Strategy {
	constructor(servers) {
		super(servers);
	}

	async handleRequest(req, res) {
		const numOfServers = this.servers.length;
		const randomServer = Math.floor(Math.random() * numOfServers);
		const serverUrl = this.servers[randomServer].URL;

		await request(req, res, {
			url: serverUrl + req.url
		});
	}
}

export default RandomStrategy;
