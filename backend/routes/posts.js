const { Router } = require("express");
const { getPostById } = require('../controllers/viewController');
const { handleCreatePost } = require("../controllers/dataController/createController");
const passport = require('passport');
require('../config/passport');

const postsRouter = Router();

postsRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  handleCreatePost(req, res);
});

postsRouter.get('/:postId', async (req, res, next ) => {

  const post = await getPostById(req, res, next);

  console.log(post, "postRouter");

  res.json(
    {post}
  );
});

postsRouter.delete('/:postId', (req, res) => {
  return res.send('delete post');
});

postsRouter.put('/:postId', (req, res) => {
  return res.send('edit post');
});

postsRouter.post('/:postId/:commentId', (req, res) => {
  return res.send('post comment post');
});

postsRouter.delete('/:postId/:commentId', (req, res) => {
  return res.send('delete comment');
});


module.exports = {postsRouter};
