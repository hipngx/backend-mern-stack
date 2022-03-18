const express = require('express');
const {verifyToken} = require('../middleware/verifyToken');
const {
    getAllPost,
    createOnePost,
    updateOnePost,
    deleteOnePost } = require('../controllers/postController.js');

const Route = express.Router();

Route.route('/').get(getAllPost).post(verifyToken, createOnePost);

Route.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

module.exports = Route;