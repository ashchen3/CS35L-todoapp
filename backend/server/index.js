const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

server.use('/api', routes);

module.exports = server;