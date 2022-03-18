require('dotenv').config(); // khoi tao bien moi truong

// connect DB
const {connectDB}= require('./config/db');
connectDB();

const express = require('express');
const cors = require('cors');

//import route
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');

//import Error Handler
const {errorHandler} = require('./middleware/errorHandler');

//khoi tao app
const app = express();

// cors
app.use(cors());

//body-parser cua express
app.use(express.json());

//khoi tao port
const port = process.env.APP_PORT;

//khoi tao route mac dinh
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'suscess',
        data: {
            post: []
        }
    })
})

//Moute the route
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/post',postRoute);

app.all('*',(req, res, next)=>{
    const error= new Error('The route can not be found');
    error.statusCode = 404;
    next(error);
})
app.use(errorHandler);//Đặt sau route, sử lý các route không tồn tại

app.listen(port, () => {
    console.log(`server is run on port ${port}`)
})