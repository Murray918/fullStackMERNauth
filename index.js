const express = require('express'),
      bodyParser = require('body-parser'),
      http = require('http'),
      morgan = require('morgan'),
      app = express(),
      router = require('./router'),
      mongoose = require('mongoose')


//app setup this talkes to our application
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*'}))
router(app);


//db setup
mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient : true })

// server setup talks to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app)
server.listen(port)
console.log('server is listening on port :', port);
