const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {user} = require('./models/users')
const {authenticate} = require('./middleware/authenticate');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
var path = require('path');
const port = process.env.PORT || 3000;

var app = express();

// middleware ..here bodyparser automatically calls the next()
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
   if(ObjectID.isValid(id)){
     Todo.findOne({
       _id: id,
       _createdBy: req.user._id
     }).then((todo)=>{
       if(!todo){
          res.status(404).send();
       }else{
         res.send({todo});
       }
     }).catch((e)=>{
      // send empty body on err
       res.status(400).send();
     });

   }else{
     return res.status(404).send();
   }
});

app.get('/todos', authenticate, (req, res)=>{
  Todo.find({_createdBy: req.user._id}).then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

app.post('/todos', authenticate, (req, res)=>{
  var newTodo = new Todo({
    text: req.body.text,
    _createdBy: req.user._id
  });

  newTodo.save().then((doc)=>{
    res.status(200).send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  // validate
  if(ObjectID.isValid(id)){
    Todo.findOneAndRemove({
      _id:id,
      _createdBy: req.user._id
    }).then((deletedItem)=>{
      if(deletedItem)
        res.send({deletedItem});
      else
        res.status(404).send();
      }, (err)=>{
        res.status(404).send();
      }).catch((e)=>{
        res.status(400).send();
      })
  }
  else{
    res.status(404).send();
  }
});

app.patch('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  // id is valid
  var body = _.pick(req.body, ['text', 'completed']);

  if(_.isBoolean(body.completed) && (body.completed)){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _createdBy:req.user._id}, {$set: body}, {new:true}).then((todo)=>{
        if(!todo){
          res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
    res.status(400).send();
  });
});

app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var newUser = new user(body);

  newUser.save().then((user)=>{
    // res.send({user});
    return token = user.generateAuthToken();
  })
  .then((token)=>{
    res.header('x-auth', token).send(newUser);
  })
  .catch((e)=>{
    res.status(400).send(_.pick(e, ['code', 'index', 'errmsg']));
  })
});

app.post('/user/login', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);

  user.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    })

  }).catch((e)=>{
    res.status(401).send();
  });
});

app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user)
});

app.delete('/users/me/token', authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((e)=>{
    res.status(400).send();
  })
});

app.listen(port, ()=>{
  console.log(`Started listening at ${port}`);
});
