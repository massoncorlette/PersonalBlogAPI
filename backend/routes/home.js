const { Router } = require("express");
const homeRouter = Router();
var jwt = require('jsonwebtoken');


homeRouter.get('/', (req, res) => {

    // payloads user object, last argument callback for generated token
    jwt.sign(req.user, 'secretkey', { expiresIn: '2 days' }, (err,token) => {
      res.json({
        token:token
      });
    });
});

module.exports = {homeRouter}