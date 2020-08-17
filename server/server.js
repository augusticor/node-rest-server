require('./config/config'); // Lee este archivo y ejecuta todo lo que contenga

const express = require('express');
const mongoose = require('mongoose');

const server = express();
const bodyParser = require('body-parser');

/*------Estos son middlewares ----------------*/
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

// para usar las rutas que separamos al otro archivo
server.use(require('./routes/user-routes'));

// DataBase Connection
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (error, resp) => {
	if (error) throw error;
	console.log('Base de datos online !');
});

server.listen(process.env.PORT, () => {
	console.log('Listening on port', process.env.PORT);
});
