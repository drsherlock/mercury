import RandomStrategy from "./Random";
import RoundRobinStrategy from "./RoundRobin";
import WeightedRandomStrategy from "./WeightedRandom";
import WeightedRoundRobinStrategy from "./WeightedRoundRobin";
import LeastConnectionsStrategy from "./LeastConnections";

const getConfiguredHandler = (strategy, servers) => {
	switch (strategy) {
		case "RANDOM":
			return new RandomStrategy(servers);
		case "ROUND_ROBIN":
			return new RoundRobinStrategy(servers);
		case "WEIGHTED_RANDOM":
			return new WeightedRandomStrategy(servers);
		case "WEIGHTED_ROUND_ROBIN":
			return new WeightedRoundRobinStrategy(servers);
		case "LEAST_CONNECTIONS":
			return new LeastConnectionsStrategy(servers);
		default:
			return new RandomStrategy(servers);
	}
};

export default getConfiguredHandler;
