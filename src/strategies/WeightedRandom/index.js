import Strategy from "../Strategy";
import request from "../../client";

class WeightedRandomStrategy extends Strategy {
	constructor(servers) {
		super(servers);

		let serverNumber = 0;
		this.serverWeights = servers.reduce((a, s) => {
			a[serverNumber] = s.WEIGHT;
			serverNumber++;
			return a;
		}, {});

		this.totalWeight = servers.reduce((a, s) => {
			a += s.WEIGHT;
			return a;
		}, 0);
	}

	async handleRequest(req, res) {
		const randomServer = this.weightedRandom();
		const serverUrl = this.servers[randomServer].URL;

		await request(req, res, {
			url: serverUrl + req.url
		});
	}

	weightedRandom() {
		let sum = 0;
		const r = Math.random() * this.totalWeight;
		for (let i in this.serverWeights) {
			sum += this.serverWeights[i];
			if (r <= sum) return i;
		}
	}
}

export default WeightedRandomStrategy;
