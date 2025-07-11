// viewController
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();


async function displayLogin(req, res, next) {

  res.render("index");
};

async function displayHome(req, res, next) {

 // const files = await prisma.files.findMany();
 // const folders = await prisma.folders.findMany();

  res.render("home");

};

module.exports = { displayHome, displayLogin };
