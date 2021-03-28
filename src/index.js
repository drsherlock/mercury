import express from 'express';
import request from 'request';

const { default: config } = await import('../' + process.env.CONFIG);

const port = config.PORT || 8080;

const servers = config.SERVERS;
const strategy = config.STRATEGY;

const handler = (req, res) => {
  switch(strategy) {
    case 'ROUND_ROBIN': 
      return roundRobinHandler(req, res);
    case 'RANDOM':
      return randomHandler(req, res);
    case 'WEIGHTED_ROUND_ROBIN':
      return weightedRoundRobinHandler(req, res);
    case 'WEIGHTED_RANDOM':
      return weightedRandomHandler(req, res);
    case 'LEAST_CONNECTIONS':
    default:
      return roundRobinHandler(req, res);
  }
};

// Round Robin
let cur = 0;
const roundRobinHandler = async (req, res) => {
  const serverUrl = servers[cur].URL
  await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};

// Random
const randomHandler = async (req, res) => {
  const numOfServers = servers.length;
  const randomServer = Math.floor(Math.random() * numOfServers);
  const serverUrl = servers[randomServer].URL
  await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
};

// Weighted Round Robin
let currentServer = 0;
let requestQueue = servers.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT).map(s => ({...s}));
const weightedRoundRobinHandler = async (req, res) => {
  if (currentServer < servers.length - 1 && requestQueue[currentServer].WEIGHT >= requestQueue[currentServer + 1].WEIGHT) {
    currentServer = 0;
  } else {
    currentServer++;
  }

  if(currentServer === servers.length) {
    requestQueue = servers.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT).map(s => ({...s}));
    currentServer = 0;
  }
  const serverUrl = servers[currentServer].URL
  await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
  requestQueue[currentServer].WEIGHT--;
}

// Weighted Random
let serverNum = 0
const serverWeights = servers.reduce((a, s) => {
  a[serverNum] = s.WEIGHT;
  serverNum++;
  return a;
}, {})
const totalWeight = servers.reduce((a, s) => {
  a += s.WEIGHT;
  return a;
}, 0)
const weightedRandomHandler = async (req, res) => {
  const randomServer = weightedRandom();
  const serverUrl = servers[randomServer].URL
  await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
}

function weightedRandom() {
  let sum = 0;
  const r = Math.random() * totalWeight;
  for (let i in serverWeights) {
    sum += serverWeights[i];
    if (r <= sum) return i;
  }
}

const server = express()
                .get('*', handler)
                .post('*', handler)
                .put('*', handler)
                .delete('*', handler);

server.listen(port, () => console.log(`Mercury running at port ${port}`));