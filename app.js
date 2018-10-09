const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const app =  express();
const { User } = require('./sequelize')

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routers
app.use('/users', require('./routes/UserRoute'));

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Server Listening port ${port}`);