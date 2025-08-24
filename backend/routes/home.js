const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');


homeRouter.get('/', (req, res) => {

  // payloads user object, last argument callback for generated token
  jwt.sign(req.user, 'secretkey', { expiresIn: '2 days' }, (err,token) => {

    res.json('Content-Type', 'application/json');

    // sending through authorization header to client side
    res.json("Authorization", `Bearer ${token}`);

    res.json({user: req.user});
    
  });
});

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