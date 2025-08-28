const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");

const { prisma } = require('../controllers/viewController');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},
async function(req, username, password, done) {
    console.log(req, 'test');
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      //comparing login password to hashed stored password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// include token in bearer schema on client side for protected routes
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   return res.json("Wrong email or password * errors not empty.");
  };

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json("Wrong email or password, * passport failed.");
    }

    jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "2d" }, (err, token) => {
      if (err) {
        return res.json("Token generation failed");
      }

      console.log('test');
  
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  });
};

module.exports = { authenticateUser };