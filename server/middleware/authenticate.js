
const {user} = require('../models/users');
var authenticate = (req, res, next)=>{
  var token = req.header('x-auth');
  user.findByToken(token).then((theuser)=>{
      if(!theuser){
        return Promise.reject();
      }
      req.user=theuser;
      req.token=token;
      next();
  }).catch((e)=>{
      res.status(401).send();
  });
};

module.exports = {authenticate};
