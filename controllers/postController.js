const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

exports.getAllPost = async (req, res, next) => {
    try {
        const post = await Post.find({}).populate('author','name').select('content createdAt');
        res.status(200).json({
            status: 'Success',
            results: post.length,
            data: { post }
        });
    } catch (error) {
        res.json(error);
    }
}

exports.createOnePost = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const post = await Post.create({ ...req.body, author: userId });
        res.status(200).json({
            status: 'Success',
            data: post
        });
    } catch (error) {
        next(error);
    }
}

exports.updateOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        //const {userId} = req.user; nhận userID nếu cần
        const post = await Post.findByIdAndUpdate(postId, { ...req.body }, { new: true, runValidator: true });
        res.status(200).json({
            status: 'Success',
            data: post
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        //const {userId} = req.user; nhận userID nếu cần
        const post = await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'Success',
            massage: 'Post has been delete'
        });
    } catch (error) {
        next(error);
    }
}