const { prisma } = require('../viewController');
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");


async function handleCreatePost(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // creating Date obj, turning to Locale format, then converting to string to store in VARCHAR in sql table
  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US");

  const stringDate = formattedDate.toString();

  try {
    await prisma.posts.create({
      data: {
        public: true,
        createdAt: stringDate ,
        title: req.body.title,
        content: req.body.content,
      }
   });
  } catch (error) {
    return res.status(400).json({ errors:error });
  }
};


async function handleCreateComment(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // creating Date obj, turning to Locale format, then converting to string to store in VARCHAR in sql table
  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US");

  const stringDate = formattedDate.toString();

  try {
    await prisma.comments.create({
      data: {
        createdAt: stringDate ,
        title: req.body.title,
        content: req.body.content,
        postID: req.params.post-id,
        authorId: req.params.author-id,
      }
   });
  } catch (error) {
    return res.status(400).json({ errors:error });
  }

};


async function handleCreateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        email: req.body.username,
        fname: req.body.firstname,
        lname: req.body.lastname,
        alias: req.body.alias,
        password: hashedPassword,
      }
   });
 // res.json("success", {user:user});

  } catch (error) {
    return res.status(400).json({ errors:error });
  }
};


module.exports = { handleCreateUser, handleCreateComment, handleCreatePost };