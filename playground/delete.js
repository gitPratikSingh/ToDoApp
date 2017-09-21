const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect!');
  }

  // db.collection('Todo').deleteMany({text:'lunch'}).then((res)=>{
  //   console.log(res);
  // });

  db.collection('Todo').findOneAndDelete({user:'pratik_delete'}).then((res)=>{
    console.log(res);
  });
});
