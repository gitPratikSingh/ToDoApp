const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect!');
  }

  // db.collection('Todo').findOneAndUpdate({user:'pratik'}, {$set:{completed:true}}, {returnOriginal: false}).then((res)=>{
  //   console.log(JSON.stringify(res, undefined, 2));
  // });
  db.collection('users').findOneAndUpdate({name:'pratik singh'}, {$set:{name:'myname'}, $inc:{age:10}}, {returnOriginal: false}).then((res)=>{
    console.log(JSON.stringify(res, undefined, 2));
    db.close();
  });

});
