const express = require('express');
const { login, register, getCurrentUser } = require('../controllers/authController');
const { checkCurrentUser } = require('../middleware/checkCurrentUser');
const Route = express.Router();

Route.route('/register').post(register);
Route.route('/login').post(login);
Route.route('/').get(checkCurrentUser, getCurrentUser);

module.exports = Route;