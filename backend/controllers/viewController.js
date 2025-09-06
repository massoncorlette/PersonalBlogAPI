// viewController
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function getAllPosts(req, res, next) {

  try {
    const files = await prisma.posts.findMany();

   return files;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: error });
  }
};

async function getPostById(req, res, next) {

  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(req.params.postId),
      },
   });

    return post;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: error });
  } 
};

module.exports = { 
  prisma,
  getAllPosts,
  getPostById
};



