const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();



//global middleware
//3rd party middleware
// server.use(morgan("dev")); 
server.use(helmet()); //3
server.use(express.json());  // built-in middleware: no need to npm install 

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome: ${nameInsert}, to the Lambda Hubs API</p>
    `);
});

//the three amigas
function logger (req, res, next){
  //log information about the request to the console -> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`${method} to ${endpoint}`);
}
module.exports = server;
