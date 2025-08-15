require('dotenv').config();
const express = require('express');
const {indexRouter} = require('./routes/index');
const {signupRouter} = require('./routes/signup');
const {homeRouter} = require('./routes/home');
const {postsRouter} = require('./routes/posts');
const {commentsRouter} = require('./routes/comments');

const app = express();
app.set('view engine', 'ejs'); // Remove when using React

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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