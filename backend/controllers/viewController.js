// viewController
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function getAllPosts(req, res, next) {

  try {
    const files = await prisma.posts.findMany({
      include: {
        comments: true
      }
    }
    );

   return files;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: error });
  }
};

// get post including comments using foreign key and select only alias for user 
async function getPostById(req, res, next) {

  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(req.params.postId),
      },
      include: {
        comments: {
          include: {
            author: {
              select: {
                alias: true,
              }
            }
          }
        }
      }
   });

   // protect post data from client side request
   if (post.public == false) {
    return false;
   };

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



