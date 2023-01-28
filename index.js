const http = require('http');
const config =  require('./config.js');
const app = require("./app");
const server = http.createServer(app);
console.log(`NODE_ENV=${config.NODE_ENV}`);
console.log(`NODE_PORT=${config.PORT}`);
server.listen(config.PORT,console.log("Welcome TAG backend"));