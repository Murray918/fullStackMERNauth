const express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	morgan = require('morgan'),
	app = express(),
	router = require('./router'),
	mongoose = require('mongoose'),
	cors = require('cors');

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true });

const corsOptions = {
	origin: 'http://localhost:8080/',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//app setup this talkes to our application
app.use(morgan(':status', ':res[header]'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
router(app);

//db setup

// server setup talks to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server is listening on port :', port);
