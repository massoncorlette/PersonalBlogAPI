const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');

homeRouter.post('/post', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json('Post Created'
      )
    }
  });
});

// middleware to verify token on protected routes
function verifyToken(req, res, next) {
 // Get auth header value
 const bearerHeader = req.headers['authorization'];

 if(typeof bearerHeader !== 'undefined') {

  const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;
  
    next();
 } else {
  res.sendStatus(403);
 }
}

module.exports = {homeRouter, verifyToken}