/*const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const authenticate = require('./auth');

// Enable parsing JSON data in request body
app.use(express.json());

// For testing purposes, this is an in-memory solution to storing lists. We will need to implement peristence soon
const todoLists = {}; //object which will store arrays

// For testing get/post, not yet implemented 
let usersList = {};

// Serve static files from the 'public' directory
app.use(express.static('public'));

// add todo to an existing list
//use fetch('/api/todos/${listName}') to access this api
app.post('/api/todos/:listName', (req, res) => {
  const listName = req.params.listName;
  const newTodo = req.body;

  if (!todoLists[listName]){
    res.json("Invalid Name");
  }

  todoLists[listName].push(newTodo);
  res.json(`Todo ${newTodo.text} added to list ${listName}`);
});

//return usernames
app.get('/api/users', (req,res) => {
    let users = Object.keys(usersList);
    res.json(users);
});


//add new empty list
app.post('/api/lists/:newListName', (req,res) =>{
    const newList = req.params.newListName;

    if (!todoLists[newList]){
        todoLists[newList] = [];
        res.json({message:`List '${newList}' created`});
    }else{
        res.status(400).json({ error: 'List already exists.' });
    }
   
});

//get tasks for specific list
app.get('/api/todos/:listName', (req, res) =>{
    const listName = req.params.listName;
    const todos = todoLists[listName] || [];
    res.json(todos);
});

//edit todo (at index) in list
app.post('/api/todos/:listName/:index', (req, res) =>{
    const listName = req.params.listName;
    const index = req.params.index;
    const newMessage = req.body.text;
    const originalMessage = todoLists[listName][index].text;

    if (!todoLists[listName] || index < 0 || index >= todoLists[listName].length) {
        res.json("Invalid list name or index");
        return;
    }

    todoLists[listName][index].text = newMessage;

    res.json(`Changed todo ${originalMessage} in list ${listName} to todo `)

});

//get all list names
app.get('/api/lists', (req,res)=>{
    const lists = Object.keys(todoLists);
    res.json(lists);
});

//add new user
app.post('/api/users/:userName', (req,res) => {
    const userPassword = req.body;
    const newUser = req.params.userName;
    usersList.newUser = newPassword;
    res.json(`User ${newUser} added with password ${userPassword}`);
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
*/
const express = require('express');
const routes = require('../routes');

const server = express();
server.use(express.json());

server.use('/api', routes);

module.exports = server;