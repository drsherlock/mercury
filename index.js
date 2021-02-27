import express from 'express';
import request from 'request';

const servers = ['http://localhost:3000', 'http://localhost:3001'];
let cur = 0;

const handler = async (req, res) => {
  // Pipe the vanilla node HTTP request (a readable stream) into `request`
  // to the next server URL. Then, since `res` implements the writable stream
  // interface, you can just `pipe()` into `res`.
  await req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};
const server = express().get('*', handler).post('*', handler);

server.listen(8080);