const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const passport = require('passport');
const { handleCreatePost } = require("../controllers/dataController/createController");
const { getAllPosts } = require('../controllers/viewController');
require('../config/passport');

homeRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next ) => {

  const posts = await getAllPosts(req, res, next);

  // req.user from passport callback authentication
  res.json({
    alias: req.user.alias,
    first: req.user.fname,
    last: req.user.lname,
    admin: req.user.is_admin,
    posts: posts
  });
});


homeRouter.post('/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  handleCreatePost(req, res);

});


module.exports = {homeRouter}