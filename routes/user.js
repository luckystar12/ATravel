var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = require('../models/user');

// app.use(passport.initialize())
// app.use(passport.session());

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log('username', username, password);
//     User.findOne({ username: username }, function (err, user) {
//       console.log('enter localstragegy');
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   User.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res, next) {
//     console.log('hihi');
//     res.redirect('/');
//   }
// );

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('欢迎访问路由/user/');
  res.send('欢迎访问路由/user/');
});

router.get('/test', function(req, res, next) {
  console.log('欢迎访问路由/user/test');
  res.send('欢迎访问路由/user/test');
  var user = new User({
    uid: 123,
    username: 'lym',
    password: '1234',
    createTime: new Date(),
    lastTime: new Date(),
  });
  user.save();
});
router.get('/test/:name', function(req, res, next) {
  const username = req.params.name;
  User.find({username}).then((result)=>{
    res.send(result);
  });
});
// router.get('/login', function(req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // console.log(req.url);
  // const data = JSON.parse(Object.keys(req.body)[0]);
  // console.log(data, data.name, data.password);
  // User.find(data).then((result)=>{
  //   console.log(result);
  //   if(result.length > 0) {
  //     res.send({code:0});
  //   }
  //   res.send({code: 29999, msg: '没有该用户'});
  // })
// });


module.exports = router;
