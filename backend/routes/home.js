const { Router } = require("express");

const homeRouter = Router();


homeRouter.get('/', (req, res) => {
  return res.send("load home");
});

module.exports = {homeRouter}