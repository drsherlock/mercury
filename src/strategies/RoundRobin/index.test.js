import { jest } from "@jest/globals";

import RoundRobinStrategy from "./";
import client from "../../client";

const servers = [
	{
		URL: "http://localhost:3000",
		WEIGHT: 1,
		FAILURE_TIMEOUT: 20,
		MAX_FAILURES: 3
	},
	{
		URL: "http://localhost:3001",
		WEIGHT: 5,
		FAILURE_TIMEOUT: 20,
		MAX_FAILURES: 3
	}
];

const roundRobinStrategy = new RoundRobinStrategy(servers);

const req = {};
const res = {};
const next = jest.fn();

describe("Random strategy", () => {
	it("should forward request", async () => {
		client.forwardRequest = jest.fn(() => Promise.resolve());

		await roundRobinStrategy.handleRequest(req, res, next);

		expect(client.forwardRequest).toHaveBeenCalled();
	});

	it("should fail", async () => {
		client.forwardRequest = jest.fn(() => Promise.reject());

		try {
			await roundRobinStrategy.handleRequest(req, res, next);
		} catch (e) {
			expect(e).toMatch("error");
		}
	});
});
