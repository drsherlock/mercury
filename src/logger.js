import winston from "winston";

const options = {
	console: {
		level: "debug",
		handleExceptions: true,
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	}
};

const logger = winston.createLogger({
	transports: [new winston.transports.Console(options.console)],
	exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
	write: function (message, encoding) {
		logger.info(message);
	}
};

export default logger;
