const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect!');
  }

  db.collection('Todo').find({_id : new ObjectID('59c31fa0e70f29327820f84b')}).toArray().then((res)=>{
    console.log(JSON.stringify(res, undefined, 2));
  });

  db.collection('Todo').find().count().then((count)=>{
    console.log(`Todos Count: ${count}`);
  });

});
