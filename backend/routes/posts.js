const { Router } = require("express");
const { getPostById } = require('../controllers/viewController');
const { handleCreatePost, handleCreateComment } = require("../controllers/dataController/createController");
const { handleEditPost } = require("../controllers/dataController/updateController");
const passport = require('passport');
require('../config/passport');

const postsRouter = Router();

postsRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  handleCreatePost(req, res);
  return res.status(201).json({ msg: "Post succesfully made." });
});

postsRouter.get('/:postId', async (req, res, next ) => {

  const post = await getPostById(req, res, next);

  res.json(
    {post}
  );
});

postsRouter.delete('/:postId', (req, res) => {
  return res.send('delete post');
});

postsRouter.put('/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const updatedPost = await handleEditPost(req, res);
  return res.json({updatedPost});
});


postsRouter.post('/:postId/comments', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const updatedPost = await handleCreateComment(req, res);
  return res.json({updatedPost});
});

postsRouter.delete('/:postId/:commentId', (req, res) => {
  return res.send('delete comment');
});




module.exports = {postsRouter};
