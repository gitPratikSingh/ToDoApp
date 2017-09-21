const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect!');
  }

  db.collection('users').insertOne({name:'pratik singh', age:28}).then((res)=>{
    console.log(res);
  })
});
