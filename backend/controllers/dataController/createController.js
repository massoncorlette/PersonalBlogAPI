const { prisma } = require('../viewController');
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");


async function handleCreatePost(req, res, next) {

}


async function handleCreateComment(req, res, next) {

}


async function handleCreateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: req.body.username,
        fname: req.body.firstname,
        lname: req.body.lastname,
        alias: req.body.alias,
        password: hashedPassword,
      }
   });
  res.json("success", {user:user});

  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = { handleCreateUser, handleCreateComment, handleCreatePost };