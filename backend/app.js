require('dotenv').config();
const express = require('express');
const expressSession = require("express-session");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma/client');
const passport = require("passport");
require("./config/passport"); // booting strategy before any initializing
const pgPool = require("./config/pool");
const cors = require('cors');


const {indexRouter} = require('./routes/index');
const {signupRouter} = require('./routes/signup');
const {homeRouter} = require('./routes/home');
const {postsRouter} = require('./routes/posts');
const {commentsRouter} = require('./routes/comments');

const app = express();

//REMOVE UPON USING REACT
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/styles"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'cats',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        pool: pgPool,
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.session());  //enables persistent login sessions

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);

//app.use((req, res, next) => {
//  res.locals.currentUser = req.user;
//  next();
//});

app.use('/home', homeRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(5000, () => console.log('Server started on port 5000'));