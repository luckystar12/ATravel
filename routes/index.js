var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("欢迎访问根路由/");
  res.send("欢迎访问根路由/");
});

module.exports = router;
