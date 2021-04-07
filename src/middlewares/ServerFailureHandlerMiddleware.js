import Route from "../Route";
import { createRequest } from "../client";

export class ServerFailureHandlerMiddleware {
	constructor(servers) {
		this.servers = servers;

		this.serverFailureMap = servers.reduce((a, s) => {
			a[s.URL] = this.createServerFailureObject(s);

			return a;
		}, {});
	}

	handleRequest = async (err, req, res, next) => {
		if (!err.response) {
			const serverUrl = err.config.url.replace(/\/$/, "");
			const server = this.serverFailureMap[serverUrl];
			const currentTime = new Date();
			if (
				(currentTime - server.failureStartTime) / 1000 >
				server.failureTimeout
			) {
				server.failureStartTime = currentTime;
				server.failureCount = 1;
			} else {
				server.failureCount++;
			}

			if (server.failureCount > server.maxFailures) {
				const failedServer = this.servers.find((s) => s.URL === serverUrl);
				let updatedServers = this.servers.filter((s) => s.URL !== serverUrl);
				Route.updateHandler(updatedServers);
				this.servers = updatedServers;
				delete this.serverFailureMap[serverUrl];

				const response = await this.checkStatus(serverUrl);
				if (response.status === 200 && response.data.status === "OK") {
					updatedServers = [...this.servers, failedServer];
					Route.updateHandler(updatedServers);
					this.servers = updatedServers;
					this.serverFailureMap[serverUrl] = this.createServerFailureObject(
						failedServer
					);
				}
			}

			next(err);
		}
	};

	createServerFailureObject = (server) => {
		return {
			failureTimeout: server.FAILURE_TIMEOUT,
			maxFailures: server.MAX_FAILURES,
			failureStartTime: new Date(),
			failureCount: 0
		};
	};

	checkStatus = async (serverUrl, retryCount = 0, lastError = null) => {
		if (retryCount > 5) return;
		try {
			return await createRequest(`${serverUrl}/health`, "GET");
		} catch (e) {
			await this.delay(retryCount);
			return this.checkStatus(serverUrl, retryCount + 1, e);
		}
	};

	delay = (retryCount) =>
		new Promise((resolve) => setTimeout(resolve, 10 ** retryCount));
}
