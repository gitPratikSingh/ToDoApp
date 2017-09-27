const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email:{
    required: true,
    minlength:1,
    type:String,
    trim:true,
    unique:true,
    validate: {
        validator: validator.isEmail,
        message: `{value} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token:{
      type: String,
      require: true
    }
  }]
});

userSchema.methods.toJSON = function(){
  var user = this;
  // convert the mongoose object to regular object
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);

};

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var secret = 'mysecret123'
    var token = jwt.sign({_id: user._id, access: access}, secret);

    user.tokens.push({access, token});

    return user.save().then(()=>{
      return token;
    });
}

userSchema.statics.findByToken = function(token) {
  var User = this; // this here refers to the schema and not to the individual user
  var decoded;

  try{
    decoded = jwt.verify(token, 'mysecret123');
  }catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':decoded.access
  })
}

var user = mongoose.model('user', userSchema);
module.exports = {user};
