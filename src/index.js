import express from "express";

import {
	profilerMiddleware,
	errorHandlerMiddleware,
	ServerFailureHandlerMiddleware
} from "./middlewares";
import Route from "./Route";

const { default: config } = await import(`../${process.env.CONFIG}`);

const port = config.PORT || 8080;

const servers = config.SERVERS;
const strategy = config.STRATEGY;

const server = express();

Route.initHandler(strategy, servers);

server.use((req, res, next) => {
	Route.router(req, res, next);
});

if (config.PROFILER) {
	server.use(profilerMiddleware);
}

const serverFailureHandlerMiddleware = new ServerFailureHandlerMiddleware(
	servers
);
server.use(serverFailureHandlerMiddleware.handleRequest);
server.use(errorHandlerMiddleware);

server.listen(port, () => console.log(`Mercury running at port ${port}`));
