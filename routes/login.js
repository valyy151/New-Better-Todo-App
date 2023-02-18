const express = require('express');
const route = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');

route.get('/', (req, res) => {
	res.render('login');
});

const createToken = (id) =>
	jwt.sign({ id }, process.env.SECRET, { expiresIn: '2h' });

route.post('/', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await Users.login(username, password);
		const token = createToken(user._id);

		res.cookie('jwt', token, { httpOnly: true });
		res.status(302).redirect('/');
	} catch (err) {
		res.status(400).json(err);
		console.log(err);
	}
});

// function handleErrors(err) {
// 	let errors = { username: '', password: '' };
// 	if (err.message === 'Username doesnt exist') {
// 		errors.username = err.message;
// 	}
// 	if (err.message === 'Incorrect password') {
// 		errors.password = err.message;
// 	}

// 	return errors;
// }

module.exports = route;
