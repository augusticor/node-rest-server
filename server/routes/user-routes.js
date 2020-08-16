const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //se llama _ como un estandar pero puede tener cualquier name

const User = require('../models/user');

const server = express();

server.get('/users', (req, res) => {
	let from = req.query.from || 0;
	from = Number(from) - 1;

	let limit = req.query.limit || 5;
	limit = Number(limit);

	User.find({}, 'name email role status google img')
		.skip(from)
		.limit(limit)
		.exec((err, usersArray) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					description: 'UPS falla en el GET',
					err,
				});
			}

			User.count({}, (err, counter) => {
				res.json({
					ok: true,
					status: 'oka',
					usersArray,
					cantidad: counter,
				});
			});
		});
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

server.delete('/users/:id', (req, res) => {
	let id = req.params.id;

	// Inhabilitar un usuario en lugar de eliminarlo completamente de la DB
	let changeStatusObj = {
		status: false,
	};

	User.findByIdAndUpdate(id, changeStatusObj, { new: true }, (error, userToDisable) => {
		if (error) {
			return res.status(400).json({
				ok: false,
				message: 'Error deleting the user :/',
				error,
			});
		}

		if (!userToDisable) {
			return res.status(404).json({
				ok: false,
				message: 'Sorry that user does not exists !',
				error,
			});
		}

		userToDisable.status = false;
		res.json({
			ok: true,
			message: 'User disabled',
			userToDisable,
		});
	});
});

module.exports = server;
