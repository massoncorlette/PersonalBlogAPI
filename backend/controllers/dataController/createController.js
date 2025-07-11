const { prisma } = require('../viewController');


async function handleCreatePost(req, res, next) {

}


async function handleCreateComment(req, res, next) {

}


async function handleCreateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }
  // REPLACE FOR TOKEN AUTHURIZATION
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        password: hashedPassword,
      }
   });
  res.redirect("/");

  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = { handleCreateUser, handleCreateComment, handleCreatePost };