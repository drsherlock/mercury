import Strategy from "../Strategy";
import request from "../../client";

class WeightedRoundRobinStrategy extends Strategy {
	// TODO: try to improve algorithm
	constructor(servers) {
		super(servers);

		this.currentServer = 0;

		this.requestQueue = servers
			.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT)
			.map((s) => ({ ...s }));
	}

	async handleRequest(req, res) {
		if (
			this.currentServer < this.servers.length - 1 &&
			this.requestQueue[this.currentServer].WEIGHT >=
				this.requestQueue[this.currentServer + 1].WEIGHT
		) {
			this.currentServer = 0;
		} else {
			this.currentServer++;
		}

		if (this.currentServer === this.servers.length) {
			this.requestQueue = this.servers
				.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT)
				.map((s) => ({ ...s }));
			this.currentServer = 0;
		}

		const serverUrl = this.servers[this.currentServer].URL;

		await request(req, res, {
			url: serverUrl + req.url
		});

		this.requestQueue[this.currentServer].WEIGHT--;
	}
}

export default WeightedRoundRobinStrategy;
