const {mongoose, ObjectID} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {user} = require('./models/users')
const express = require('express');
const bodyParser = require('body-parser');

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
       res.status(404).send();
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

app.listen(3000, ()=>{
  console.log('Listening on 3000');
});
