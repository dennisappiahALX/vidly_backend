const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
   
}


module.exports = auth;