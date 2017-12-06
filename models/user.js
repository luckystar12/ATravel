var mongoose = require('mongoose');
var config = require('../config/config.js');
mongoose.connect(config.mongodb);

var UserSchema = mongoose.Schema({
  uid: Number,
  name: String,
  createTime: Date,
  lastTime: Date,
});

module.exports = mongoose.model('User', UserSchema);
