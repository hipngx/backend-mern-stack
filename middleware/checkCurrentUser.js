const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req, res, next) => {
    //Access Authorization from header
    const Authorization = req.header('authorization')

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        //lấy token 
        const token = Authorization.replace('Bearer ', '');

        //giải mã token
        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            req.user = { userId };
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
}