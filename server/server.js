//library imports
const {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');

var app = express();

app.use(bodyParser.json());

//send data to the server
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  //saving and sendong back response to postman
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/1234 -setting dynamic parameter
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.status(400).send(todo);
  }).catch((e) => res.status(400).send());
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
