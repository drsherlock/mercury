import express from "express";
import morgan from "morgan";

import logger from "./logger";

import {
	errorHandlerMiddleware,
	ServerFailureHandlerMiddleware
} from "./middlewares";
import Route from "./Route";

const { default: config } = await import(`../${process.env.CONFIG}`);

const port = config.PORT || 8080;

const servers = config.SERVERS;
const strategy = config.STRATEGY;

const server = express();

server.use(
	morgan(
		':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
		{
			stream: logger.stream,
			skip: (req, res) => process.env.NODE_ENV === "test"
		}
	)
);

Route.initHandler(strategy, servers);

server.use((req, res, next) => {
	Route.router(req, res, next);
});

const serverFailureHandlerMiddleware = new ServerFailureHandlerMiddleware(
	servers
);
server.use(serverFailureHandlerMiddleware.handleRequest);
server.use(errorHandlerMiddleware);

server.listen(port, () => logger.info(`Mercury running at port ${port}`));
