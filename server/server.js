const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{
    type: String,
    required: true,
    minlength:1,
    trim:true
  },
  completed:{
    type: Boolean,
    default:false
  },
  completedAt:{
    type: Number,
    default:null
  }
});

var newTodo = new Todo({
  text:'cook dinner'
});

newTodo.save().then((doc)=>{
  console.log('Document saved :', doc);
}, (e)=>{
  console.log('Error:', e);
})

var user = mongoose.model('user', {
  email:{
    required: true,
    minlength:1,
    type:String,
    trim:true
  }
});

var newUser = new user({
  email:' abs @ g.com '
});

newUser.save().then((doc)=>{
  console.log(doc);
});
