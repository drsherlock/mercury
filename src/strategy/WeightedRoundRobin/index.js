import request from 'request';

class WeightedRoundRobinStrategy {
  constructor(servers) {
    this.servers = servers

    this.currentServer = 0;

    this.requestQueue = servers.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT).map(s => ({...s}));
  }

  async handleRequest(req, res) {
    if (this.currentServer < this.servers.length - 1 && this.requestQueue[this.currentServer].WEIGHT >= this.requestQueue[this.currentServer + 1].WEIGHT) {
      this.currentServer = 0;
    } else {
      this.currentServer++;
    }

    if(this.currentServer === this.servers.length) {
      this.requestQueue = this.servers.sort((s1, s2) => s2.WEIGHT - s1.WEIGHT).map(s => ({...s}));
      this.currentServer = 0;
    }

    const serverUrl = this.servers[this.currentServer].URL

    await req.pipe(request({ url: serverUrl + req.url })).pipe(res);

    this.requestQueue[this.currentServer].WEIGHT--;
  }
}

export default WeightedRoundRobinStrategy;