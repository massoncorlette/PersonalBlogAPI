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

module.exports = { 
  prisma,
  getAllPosts
};



