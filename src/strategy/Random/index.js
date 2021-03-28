import request from "request";

class RandomStrategy {
  constructor(servers) {
    this.servers = servers;
  }

  async handleRequest(req, res) {
    const numOfServers = this.servers.length;
    const randomServer = Math.floor(Math.random() * numOfServers);
    const serverUrl = this.servers[randomServer].URL;

    await req.pipe(request({ url: serverUrl + req.url })).pipe(res);
  }
}

export default RandomStrategy;
