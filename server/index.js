require('dotenv').config;

const server = require('./src');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server is listening at http://localhost:%d', PORT)
});