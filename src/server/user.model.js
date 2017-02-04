var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: Boolean,
  location: String,
  meta: {
    userage: Number,
    website: String
  },
  created_on: Date,
  updated_on: Date


});

var User = mongoose.model('User', userSchema);

module.exports = User;
