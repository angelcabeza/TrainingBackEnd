const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    let token = req.get("x-access-token");

    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ok:false, err:"Invalid token"});
    }
};

module.exports = {verifyToken};