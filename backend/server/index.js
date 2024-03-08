const express = require('express');
const rootRoutes = require('../routes/user');
const apiRoutes = require('../routes');

const server = express();
server.use(express.json());

server.use('/api', apiRoutes);
server.use('/', rootRoutes);

module.exports = server;