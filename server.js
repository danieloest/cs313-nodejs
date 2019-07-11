require('dotenv').config();
console.log(process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);
const express = require('express')
var path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')
const userController = require("./controllers/userController.js");
var session = require('express-session')


const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(session({secret: 'super-secret-key'}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/todo', (req, res) => res.sendFile(__dirname + '/todo/todo.html'))
  .get('/todo', (req, res) => res.sendFile(__dirname + '/public/todo.html'))
  .get('/signUp', (req, res) => {
      console.log("Trying to access sign up page");
    })
    // Logging in
    .post('/logIn', (req, res) => {
      userController.logIn(req, res, function () {
        console.log("Session: " + req.session.loggedIn);
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
    .post('/logOut', (req, res) => {
      console.log("Logging out");
      // console.log("Logged in before: " + req.session.loggedIn);
      userController.logOut(req);
      res.json({success: true});
      // console.log("Logged in after: " + req.session.loggedIn);
      // res.redirect('back');
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
