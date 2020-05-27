/**
 * src/app.ts
 * Central server file, uses Express.
 * © George Pickering 2020, https://github.com/geopic
 */

import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import props from '@/common/props';

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
  );
  res.setHeader('Access-Control-Allow-Methods', [
    'GET, PUT, POST, DELETE, HEAD'
  ]);

  // Prevent direct access to hosted data.
  if (req.header('Referer') || req.route === '/') {
    next();
  } else {
    res.sendStatus(403).end();
  }
});

const server = http.createServer(app).listen(props.site.serverPort);

server.on('error', err => {
  throw err;
});

server.on('listening', () => {
  console.log(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Server listening on port ${
      props.site.serverPort
    }.`
  );
});
