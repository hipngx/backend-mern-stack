const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
    try {
        // người dùng điền các thông tin vào request body
        const user = await User.create(req.body) //tạo biến user bằng body của req
        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET) // tạo token
        res.status(200).json({
            status: 'Sussces',
            data: { token, userName: user.name }
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            //error email
            const err = new Error('Email is not correct');
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET)

            res.status(200).json({  //dữ liệu trả về
                status: 'Success',
                data: { token, userName: user.name }
            })
        } else {
            //password erorr
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        res.json(error)
    }
}

//get current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null }
        if (req.user) {
            const user = await User.findOne({ _id: req.user.userId });
            data.user = { userName: user.name }
        }

        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (error) {
        res.json(error)
    }
}