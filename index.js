var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('./config/mongoose.js');
var User = require('./models/user');
var db = mongoose();
var index = require('./routes/index');
var user = require('./routes/user');
var app = express();
app.use(cors());
// app.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username, password);
    User.find({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (user.length===0) { return done(null, false); }
      if (user[0].password !== password ) { return done(null, false); }
      return done(null, user[0]);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use(passport.initialize())
app.use(passport.session());

app.use('/', index);
app.use('/user', user);

app.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }, function(err, user, info){
    console.log(err, user, info);
    if (!user) {
      return res.send({code:29999, msg: '用户名或者密码错误'});
    }
    return res.send({code: 0});
  })(req, res, next);
});
app.get('/logout',
function(req, res){
  req.logout();
  res.redirect('/login');
});
console.log("hi");
app.listen(3001);
module.exports = app;