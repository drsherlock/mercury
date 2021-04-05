import express from "express";

import { profilerMiddleware, errorHandlerMiddleware } from "./middlewares";
import getConfiguredHandler from "./strategies";

const { default: config } = await import(`../${process.env.CONFIG}`);

const port = config.PORT || 8080;

const servers = config.SERVERS;
const strategy = config.STRATEGY;

const configuredHandler = getConfiguredHandler(strategy, servers);

const server = express();

if (config.PROFILER) {
	server.use(profilerMiddleware);
}

server
	.get("*", configuredHandler.handleRequest)
	.post("*", configuredHandler.handleRequest)
	.put("*", configuredHandler.handleRequest)
	.delete("*", configuredHandler.handleRequest);

server.use(errorHandlerMiddleware);

server.listen(port, () => console.log(`Mercury running at port ${port}`));
