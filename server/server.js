const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {user} = require('./models/users')
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const port = process.env.PORT || 3000;

var app = express();

// middleware ..here bodyparser automatically calls the next()
app.use(bodyParser.json());

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;
   if(ObjectID.isValid(id)){
     Todo.findById(id).then((todo)=>{
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

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

app.post('/todos', (req, res)=>{
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc)=>{
    res.status(200).send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  // validate
  if(ObjectID.isValid(id)){
    Todo.findByIdAndRemove({_id:id}).then((deletedItem)=>{
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

app.patch('/todos/:id', (req, res)=>{
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo)=>{
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

app.listen(port, ()=>{
  console.log(`Started listening at ${port}`);
});
