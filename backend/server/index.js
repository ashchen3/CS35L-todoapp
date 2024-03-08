const express = require('express');
const rootRoutes = require('../routes/user');
const apiRoutes = require('../routes');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

server.use('/api', apiRoutes);
server.use('/', rootRoutes);

module.exports = server;