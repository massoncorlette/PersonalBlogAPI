require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const {indexRouter} = require('./routes/index');
const {signupRouter} = require('./routes/signup');
const {homeRouter} = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);

//app.use((req, res, next) => {
//  res.locals.currentUser = req.user;
//  next();
//});


app.use('/home', homeRouter);


app.listen(5000, () => console.log('Server started on port 5000'));