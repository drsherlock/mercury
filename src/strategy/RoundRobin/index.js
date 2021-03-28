import request from 'request';

class RoundRobinStrategy {
	constructor(servers) {
		this.servers = servers

		this.currentRequestNumber = 0;
	}

	async handleRequest(req, res) {
		const serverUrl = this.servers[this.currentRequestNumber].URL

	  	await req.pipe(request({ url: serverUrl + req.url })).pipe(res);

	  	this.currentRequestNumber = (this.currentRequestNumber + 1) % this.servers.length;
	}
}

export default RoundRobinStrategy;