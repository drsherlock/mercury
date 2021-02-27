import express from 'express';
import request from 'request';

const { default: config } = await import(process.env.CONFIG);

const port = config.PORT || 8080;

const servers = config.SERVERS;
let cur = 0;

const handler = async (req, res) => {
  // Pipe the vanilla node HTTP request (a readable stream) into `request`
  // to the next server URL. Then, since `res` implements the writable stream
  // interface, you can just `pipe()` into `res`.
  await req.pipe(request({ url: servers[cur].URL + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};
const server = express().get('*', handler).post('*', handler);

server.listen(port, () => console.log(`Mercury running at port ${port}`));