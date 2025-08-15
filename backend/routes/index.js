// const authenticateUser = require("../config/passport");

const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.send("get Index");
});

const {authenticateUser} = require('./config/passport');
const {validateUser} = require('./controllers/viewController')

indexRouter.post("/login", validateUser(), authenticateUser);



module.exports = {indexRouter};
