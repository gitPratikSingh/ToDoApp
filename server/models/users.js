const mongoose = require('mongoose');
var user = mongoose.model('user', {
  email:{
    required: true,
    minlength:1,
    type:String,
    trim:true
  }
});
module.exports = {user};
