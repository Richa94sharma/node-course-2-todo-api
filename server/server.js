// var mongoose =   require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user')

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo = new Todo({
    text:req.body.text
});
todo.save().then((doc)=>{
    res.send(doc);
},(e)=>{
    res.status(400).send(e);
});
});


app.listen(3000,()=>{
console.log('Started on port 3000');
})




// var user = new User({
//     email: 'richa@gmail.com'
// }) 

// user.save().then((doc)=>{
//     console.log('User Saved',doc);

// },(e)=>{
//     console.log('Unable to save',e)
// })

// var otherTodo = new Todo({
//     text: 'true'
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save',e)
// })


// var saveTodo = new Todo({
//     text:'  ',
   
// });

// saveTodo.save().then((doc)=>{
//     console.log('Saved todo', doc);
// },(e)=>{
//     console.log('Unable to save todo');
// })
