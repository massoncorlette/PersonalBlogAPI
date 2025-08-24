const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");

const { prisma } = require('../controllers/viewController');

passport.use(

  new LocalStrategy(async (username, password, done) => {
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
  }),
);


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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const { validationResult } = require("express-validator");

const authenticateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.locals.errorMsg = "Wrong email or password.";

    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  // If no validation errors, authenticate with passport
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })(req, res, next);
};

module.exports = { authenticateUser };