const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();



//global middleware
//3rd party middleware
server.use(morgan("dev")); 
server.use(helmet()); //3

server.use(express.json());  // built-in middleware: no need to npm install 
server.use(logger); //dont envoke because is a VOID function and doesn't have a return statement

server.use('/api/hubs', hubsRouter);

// server.use(name); is globally available but we only need it for one route so we will add it to params
server.get('/',name, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome: ${nameInsert}, to the Lambda Hubs API</p>
    `);
});


server.use(function (req, res, next) {
  res 
    .status(404)
    .json({message: "Oooooooooops, did not find what you're looking for"})
})

//the three amigas
function logger (req, res, next){
  //log information about the request to the console -> GET to /
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`${method} to ${endpoint}`);

  next(); //moves the request to the next middleware
}

//name
function name (req, res, next){
  const newName = req.name ? req.name : 'John Doe';
  req.name = newName;
  next();
}


module.exports = server;
