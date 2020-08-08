const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	errorMessage: '{VALUE} rol no esta definido, ingresa uno adecuado', //el que ingresa + mensaje
};

let Schema = mongoose.Schema;

let schemaUser = new Schema({
	name: {
		type: String,
		required: [true, 'The name is required jaja'],
	},
	email: {
		type: String,
		required: [true, 'The email is necessary'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is mandatory'],
	},
	img: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: validRoles,
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

schemaUser.plugin(uniqueValidator, {
	message: '{PATH} debe de ser único',
});

module.exports = mongoose.model('User', schemaUser);
