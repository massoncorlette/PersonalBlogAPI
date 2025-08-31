const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const { verifyToken } = require("../middlewares/mainware");
const passport = require('passport');
require('../config/passport');

homeRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res ) => {

  res.json({ message: 'Access granted!', user: req.user });


});

homeRouter.post('/post', verifyToken, passport.authenticate('jwt', { session: false }), (req, res) => {
  

});


module.exports = {homeRouter, verifyToken}