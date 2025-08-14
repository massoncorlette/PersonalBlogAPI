const { Router } = require("express");

const postsRouter = Router();

postsRouter.get('/:commentId', (req, res) => {
  return res.send("loading post");
});

postsRouter.post('/:commentId', (req, res) => {
  return res.send('create post');
});

postsRouter.put('/:commentId', (req, res) => {
  return res.send('update post');
});

postsRouter.delete('/:commentId', (req, res) => {
  return res.send('delete post');
});


module.exports = {postsRouter};
