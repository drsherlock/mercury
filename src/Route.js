import { Router } from "express";

import getConfiguredHandler from "./strategies";

class Route {
	// TODO: is this the best design?
	static strategy;
	static server;
	static router;

	static initHandler(strategy, servers) {
		this.strategy = strategy;
		this.servers = servers;

		this.updateHandler(servers);
	}

	static updateHandler(servers) {
		const handler = getConfiguredHandler(this.strategy, servers);

		this.router = new Router();

		this.router
			.get("*", handler.handleRequest)
			.post("*", handler.handleRequest)
			.put("*", handler.handleRequest)
			.delete("*", handler.handleRequest);
	}
}

export default Route;
