const jwt = require("jsonwebtoken");

let privateKey = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
    let auth = req.headers["authorization"];
    if(typeof auth !=='undefined'){
        const token = auth.split(" ")[1];
        if (token == undefined) {
            return res.status(403).send("Missing token");
        }
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) return res.status(401).send("Invalid Token");
            req.userInfo = decoded;
            return next();
        });
    }
};

exports.verifyToken = verifyToken;