import RandomStrategy from "./Random";
import RoundRobinStrategy from "./RoundRobin";
import WeightedRandomStrategy from "./WeightedRandom";
import WeightedRoundRobinStrategy from "./WeightedRoundRobin";

const getConfiguredHandler = (strategy, servers) => {
	switch (strategy) {
		case "ROUND_ROBIN":
			return new RoundRobinStrategy(servers);
		case "RANDOM":
			return new RandomStrategy(servers);
		case "WEIGHTED_ROUND_ROBIN":
			return new WeightedRoundRobinStrategy(servers);
		case "WEIGHTED_RANDOM":
			return new WeightedRandomStrategy(servers);
		case "LEAST_CONNECTIONS":
		default:
			return new RandomStrategy(servers);
	}
};

export default getConfiguredHandler;
