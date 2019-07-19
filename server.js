require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
const express = require('express')
var path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')
var session = require('express-session')
var request = require('request');


const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

const userController = require("./controllers/userController.js");

express()
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.use(session({secret: 'super-secret-key'}))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/todo', (req, res) => res.sendFile(__dirname + '/public/todo.html'))
.get('/', (req, res) => res.sendFile(__dirname + '/public/todo.html'))
// Logging in
.post('/logIn', (req, res) => {
  userController.logIn(req, res, function () {
    res.sendFile(__dirname + '/public/todo.html');
  });
})
// Adding user to database
.post('/addUser', userController.addUser)
.get('/isLoggedIn', (req, res) => {
  response = userController.getIsLoggedIn(req);
  var results = {success: response};
  res.json(results);
})
// Log out
.post('/logOut', (req, res) => {
  userController.logOut(req);
  res.json({success: true});
})
// Load todo list
.get('/loadTodoList', (req, res) => {
  userController.getTodoList(req,res);
})
// Remove an item from database
.post('/removeTask', (req, res) => {
  userController.removeTask(req, res);
})
.post('/addTask', (req, res) => {
  userController.addTask(req, res);
})
.post('/markCompletion', (req, res) => {
  userController.markCompletion(req, res);
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
