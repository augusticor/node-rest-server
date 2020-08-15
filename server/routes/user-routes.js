const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //se llama _ como un estandar pero puede tener cualquier name

const User = require('../models/user');

const server = express();

server.get('/users', (req, res) => {
	res.json('get user');
});

server.post('/users', (req, res) => {
	let bodyOfRequest = req.body;

	let user = new User({
		name: bodyOfRequest.name,
		email: bodyOfRequest.email,
		password: bcrypt.hashSync(bodyOfRequest.password, 10),
		role: bodyOfRequest.role,
	});

	user.save((error, dateBaseUser) => {
		if (error) {
			return res.status(400).json({
				ok: false,
				description: 'Errorin',
				error,
			}); //Bad request
		}

		res.json({
			ok: true,
			dateBaseUser,
		});
	});
});

server.put('/users/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

	User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, dataBaseUser) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				status: 'bad request',
				err,
			});
		}

		res.json({
			ok: true,
			dataBaseUser,
		});
	});
});

server.delete('/users', (req, resp) => {
	resp.json('INhabilitar usuarios');
});

module.exports = server;
