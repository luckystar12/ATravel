var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('欢迎访问路由/user/');
  res.send('欢迎访问路由/user/');
});

router.get('/test', function(req, res, next) {
  console.log('欢迎访问路由/user/test');
  res.send('欢迎访问路由/user/test');
  // var user = new User({
  //   uid: 123,
  //   name: 'lym',
  //   createTime: new Date(),
  //   lastTime: new Date(),
  // });
  // user.save();
});
router.get('/test/:name', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const name = req.params.name;
  User.find({name}).then((result)=>{
    res.send(result);
  });
});

module.exports = router;
