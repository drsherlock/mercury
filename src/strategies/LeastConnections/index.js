import Strategy from "../Strategy";
import request from "../../client";

class LeastConnectionsStrategy extends Strategy {
	// TODO: use a min-heap?
	constructor(servers) {
		super(servers);

		this.serversWithConnCount = servers.map((s) => ({ connCount: 0, ...s }));
	}

	async handleRequest(req, res, next) {
		let leastConnCountServer = this.serversWithConnCount[0];

		for (let server of this.serversWithConnCount) {
			leastConnCountServer =
				leastConnCountServer.connCount < server.connCount
					? leastConnCountServer
					: server;
		}

		leastConnCountServer.connCount++;

		const serverUrl = leastConnCountServer.URL;

		try {
			await request(req, res, {
				url: serverUrl + req.url
			});
		} catch (err) {
			next(err);
		}

		leastConnCountServer.connCount--;
	}
}

export default LeastConnectionsStrategy;
