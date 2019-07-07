require('dotenv').config();
console.log(process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);
const express = require('express')
var path = require('path')
// const PORT = process.env.PORT || 5000
const PORT = 5000
var bodyParser = require('body-parser')
const userController = require("./controllers/userController.js");



const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

// var sql = "SELECT * FROM test";

// pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result:");
//     console.log(result.rows);


// });



express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/todo', (req, res) => res.sendFile(__dirname + '/todo/todo.html'))
  .get('/signUp', (req, res) => {
      console.log("Trying to access sign up page");
    })
    // Logging in
    .post('/logIn', userController.logIn)
    // Adding user to database
    .post('/addUser', userController.addUser)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
