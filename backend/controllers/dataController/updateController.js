const { prisma } = require('../viewController');
const { validationResult } = require("express-validator");

async function handleEditPost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedPost = await prisma.posts.update({
    where: {
      id: parseInt(req.params.postId),
    },
    data: {
      public: req.body.published,
      title: req.body.title,
      content: req.body.content,
    },
  });

  return updatedPost;
  } catch (error) {
    return res.status(400).json({ errors:error });
  }
};

module.exports = { handleEditPost }
