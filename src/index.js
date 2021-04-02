import express from "express";

import getConfiguredHandler from "./strategies";

const { default: config } = await import(`../${process.env.CONFIG}`);

const port = config.PORT || 8080;

const servers = config.SERVERS;
const strategy = config.STRATEGY;

const configuredHandler = getConfiguredHandler(strategy, servers);

const handler = async (req, res) => {
	await configuredHandler.handleRequest(req, res);
};

const server = express()
	.get("*", handler)
	.post("*", handler)
	.put("*", handler)
	.delete("*", handler);

server.listen(port, () => console.log(`Mercury running at port ${port}`));
