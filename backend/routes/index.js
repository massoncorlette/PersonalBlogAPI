const authenticateUser = require("../config/passport");
const { Router } = require("express");
const { displayLogin } = require("../controllers/viewController");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  return displayLogin(req, res, next);
});

indexRouter.post("/", authenticateUser);


module.exports = indexRouter;
