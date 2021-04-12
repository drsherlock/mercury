import getConfiguredHandler from "./";
import RandomStrategy from "./Random";
import RoundRobinStrategy from "./RoundRobin";
import WeightedRandomStrategy from "./WeightedRandom";
import WeightedRoundRobinStrategy from "./WeightedRoundRobin";
import LeastConnectionsStrategy from "./LeastConnections";

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

describe("Strategies", () => {
	it("should return RandomStrategy object", () => {
		const randomStrategy = new RandomStrategy(servers);

		const handler = getConfiguredHandler("RANDOM", servers);

		expect(JSON.stringify(handler)).toEqual(JSON.stringify(randomStrategy));
	});

	it("should return RoundRobinStrategy object", () => {
		const roundRobinStrategy = new RoundRobinStrategy(servers);

		const handler = getConfiguredHandler("ROUND_ROBIN", servers);

		expect(JSON.stringify(handler)).toEqual(JSON.stringify(roundRobinStrategy));
	});

	it("should return WeightedRandomStrategy object", () => {
		const weightedRandomStrategy = new WeightedRandomStrategy(servers);

		const handler = getConfiguredHandler("WEIGHTED_RANDOM", servers);

		expect(JSON.stringify(handler)).toEqual(
			JSON.stringify(weightedRandomStrategy)
		);
	});

	it("should return WeightedRoundRobinStrategy object", () => {
		const weightedRoundRobinStrategy = new WeightedRoundRobinStrategy(servers);

		const handler = getConfiguredHandler("WEIGHTED_ROUND_ROBIN", servers);

		expect(JSON.stringify(handler)).toEqual(
			JSON.stringify(weightedRoundRobinStrategy)
		);
	});

	it("should return LeastConnectionsStrategy object", () => {
		const leastConnectionsStrategy = new LeastConnectionsStrategy(servers);

		const handler = getConfiguredHandler("LEAST_CONNECTIONS", servers);

		expect(JSON.stringify(handler)).toEqual(
			JSON.stringify(leastConnectionsStrategy)
		);
	});
});
