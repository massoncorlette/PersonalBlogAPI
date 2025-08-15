// const authenticateUser = require("../config/passport");

const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.render("index");
});

const {authenticateUser} = require('../config/passport');
const {validateUser} = require('../controllers/validation');

indexRouter.post("/login", validateUser(), authenticateUser);



module.exports = {indexRouter};
