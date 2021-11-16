const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const header = req.headers.authorization;

    if (!header){
        return res.status(400).json({msg: "No header"});
    }


    const token = header.split(' ')[1];
    jwt.verify(token,'secret', (err,decoded) => {
        if (err){
            return res.status(400).json({msg: header});
        }

        req.user = decoded;
        next();
    })
};

module.exports = {verifyToken};