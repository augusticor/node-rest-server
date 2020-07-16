require('./config/config'); // Lee este archivo y ejecuta todo lo que contenga

const express = require('express');
const server = express();

const bodyParser = require('body-parser');

/*------Estos son middlewares ----------------*/
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.get('/users', (req, res) => {
	res.json('get user');
});

server.post('/users', (req, res) => {
	let bodyOfRequest = req.body;

	if (bodyOfRequest.name === undefined) {
		res.status(400).json({
			ok: false,
			description: 'El nombre es necesario',
		}); //bad request
	} else {
		res.json({
			person: bodyOfRequest,
		});
	}
});

server.put('/users/:id', (req, res) => {
	let id = req.params.id;
	res.json({
		id,
	});
});

server.delete('/users', (req, resp) => {
	resp.json('INhabilitar usuarios');
});

server.listen(process.env.PORT, () => {
	console.log('Listening on port', process.env.PORT);
});
