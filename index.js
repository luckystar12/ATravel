var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
// var mongoose = require('./config/mongoose.js');
// var User = require('./models/user');
// var db = mongoose();
var index = require('./routes/index');
var user = require('./routes/user');
var app = express();
app.use(cors());

const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

// app.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', index);
app.use('/user', user);

console.log("hi");
app.listen(3001);
module.exports = app;