const { Router } = require("express");

const commentsRouter = Router();

commentsRouter.get('/:postId/:commentId', (req, res) => {
  return res.send("loading comment");
});

commentsRouter.post('/:postId/:commentId', (req, res) => {
  return res.send('create comment');
});

commentsRouter.put('/:postId/:commentId', (req, res) => {
  return res.send('update comment');
});

commentsRouter.delete(':postId/:commentId', (req, res) => {
  return res.send('delete comment');
});

module.exports = {commentsRouter};
