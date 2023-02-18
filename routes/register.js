const express = require('express');
const route = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');

route.get('/', (req, res) => {
	res.render('register');
});

route.post('/', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const newUser = await Users.create({ username, email, password });
		const token = createToken(newUser._id);

		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: newUser._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
});

const handleErrors = (err) => {
	let errors = { username: '', password: '', email: '' };

	if (err.code === 11000 && err.message.includes('username')) {
		errors.username = 'Username already in use';
	}
	if (err.code === 11000 && err.message.includes('email')) {
		errors.email = 'Email already in use';
	}

	if (err.message.includes('users validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const createToken = (id) => {
	return (
		jwt.sign({ id }, process.env.SECRET),
		{
			expiresIn: '1h',
		}
	);
};

module.exports = route;
