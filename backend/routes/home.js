const { Router } = require("express");

const homeRouter = Router();


homeRouter.get('/', (req, res) => {

    // sends user obj, secretkey and exp as payload
    jwt.sign({user:req.locals.user}, 'secretkey', { expiresIn: '2 days' }, (err,token) => {
      res.json({
        token:token
      });
    });

  return res.send("load home");
});

module.exports = {homeRouter}