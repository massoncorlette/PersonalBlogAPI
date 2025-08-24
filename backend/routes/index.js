const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.json("home json log");
});

const {authenticateUser} = require('../config/passport');
const {validateUser} = require('../controllers/validation');

indexRouter.post("/", (req, res) => {
  res.json('test');
});



module.exports = {indexRouter};
