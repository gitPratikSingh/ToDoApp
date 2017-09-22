const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todos');
const {user} = require('./models/users')
const express = require('express');
const bodyParser = require('body-parser');
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

app.listen(port, ()=>{
  console.log(`Started listening at ${port}`);
});
