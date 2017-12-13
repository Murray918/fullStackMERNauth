const express = require('express'),
      bodyParser = require('body-parser'),
      http = require('http'),
      morgan = require('morgan'),
      app = express()
//app setup this talkes to our application

app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*'}))


// server setup talks to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app)
server.listen(port)
console.log('server is listening on port :', port);
