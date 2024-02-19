const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const authenticate = require('./auth');

// Enable parsing JSON data in request body
app.use(express.json());

// For testing purposes, this is an in-memory solution to storing lists. We will need to implement peristence soon
const todoLists = {};

// For testing get/post, not yet implemented 
let usersList = {};

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to add a new todo
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