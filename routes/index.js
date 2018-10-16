var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('../config/mongoose.js');
var User = require('../models/user');
var db = mongoose();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(
  function(username, password, done) {
    // var hash = crypto.createHash('sha256').update({username, password}, 'utf8').digest();
    // console.log('hash', hash);
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


router.use(passport.initialize())
router.use(passport.session());

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("欢迎访问根路由/");
  res.send("欢迎访问根路由/");
});

router.post('/login', function(req, res, next){
  console.log('------> Welcome to access url /login - post');

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }, function(err, user, info){
    console.log(err, user, info);
    if (!user) {
      return res.send({code:29999, msg: '用户名或者密码错误'});
    }
    
    var token = jwt.sign({ foo: user._id }, 'shhhhh');
    console.log('token:', token)
    return res.send({code: 0, msg: '登录成功', token});
  })(req, res, next);
});

// app.get('/logout',
// function(req, res){
//   req.logout();
//   res.redirect('/login');
// });

module.exports = router;
