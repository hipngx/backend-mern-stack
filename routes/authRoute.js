const express = require('express');
const {login, register}=require('../controllers/authController');
const Route = express.Router();

Route.route('/register').post(register);
Route.route('/login').post(login);

module.exports = Route;