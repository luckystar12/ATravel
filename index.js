var express = require('express');
var mongoose = require('./config/mongoose.js');
var db = mongoose();
var index = require('./routes/index');
var user = require('./routes/user');
var app = express();
app.use('/', index);
app.use('/user', user);

console.log("hi");
app.listen(3000);
module.exports = app;