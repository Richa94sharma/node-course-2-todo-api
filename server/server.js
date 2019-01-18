// var mongoose =   require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
var express = require('express');
var bodyParser = require('body-parser');
var{ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
var todo = new Todo({
    text:req.body.text
});

todo.save().then((doc)=>{
    res.send(doc);
},(e)=>{
    res.status(404).send(e);
});
});


app.get('/todos',(req,res)=>{
Todo.find().then((todos)=>{
res.send({todos})
},(e)=>{
res.status(400).send(e);
})
});

app.get('/todos/:id',(req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(404).send();
    })
});
app.listen(3000,()=>{
console.log(`Started on port ${port}`);
})

module.exports = {app}; 


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
