const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, "abc123/");

            //get user from token

            req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: "Not Authorized"
            });
        }
     }

     if(!token) {
        res.status(401).json({
            message: "Not Authorized"
        });
     }

})

module.exports = {
        protect 
}