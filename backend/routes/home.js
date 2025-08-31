const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const passport = require('passport');
require('../config/passport');

homeRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res ) => {

  // req.user from passport callback authentication
  res.json({
    alias: req.user.alias,
    first: req.user.fname,
    last: req.user.lname,
  });
});

homeRouter.post('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
  

});


module.exports = {homeRouter}