const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // lay quyền truy cập trong req header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        //error
        const err = new Error('Unauthorized!');
        err.statusCode = 400;
        return next(err);
    }
    //lấy token nếu có Authorization
    const token = Authorization.replace('Bearer ', '');//xóa đầu bearer mặc định trong token

    //giải mã token
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    //Asign req
    req.user = { userId };
    next();

}