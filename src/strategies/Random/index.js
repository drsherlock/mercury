import Strategy from "../Strategy";
import { forwardRequest } from "../../client";

class RandomStrategy extends Strategy {
	constructor(servers) {
		super(servers);
	}

	handleRequest = async (req, res, next) => {
		const numOfServers = this.servers.length;
		const randomServer = Math.floor(Math.random() * numOfServers);
		const serverUrl = this.servers[randomServer].URL;

		try {
			await forwardRequest(req, res, {
				url: serverUrl + req.url
			});
		} catch (err) {
			next(err);
		}
	};
}

export default RandomStrategy;
