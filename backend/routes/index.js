// const authenticateUser = require("../config/passport");
const jwt = require('jsonwebtoken');

const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.send("get Index");
});

indexRouter.post("/login", (req, res) => {

  //parse req.body from React component

  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }


  // sends user obj, secretkey and exp as payload
  jwt.sign({user:user}, 'secretkey', { expiresIn: '2 days' }, (err,token) => {
    res.json({
      token:token
    });
  });

  res.redirect("/home");
});




// indexRouter.post("/", authenticateUser);


module.exports = {indexRouter};
