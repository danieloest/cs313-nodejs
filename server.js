require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
const express = require('express')
var path = require('path')
const PORT = process.env.PORT || 5000
const bcrypt = require('bcrypt');




const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});   

express()
  .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))

.get('/person', (req, res) => res.sendFile(__dirname + '/ta10/person.html'))
.get('/ta10', (req, res) => res.sendFile(__dirname + '/ta10/person.html'))
.get('/getPerson', (req, res) => {
    console.log("In get person :)");
    let id = parseInt(req.query.id);
    console.log("Id is: " + id);
    pool.query('SELECT * FROM person WHERE id = $1', [id], (err, qres) => {
        if (err) {
            throw err
        }
        console.log('person:', qres.rows[0])
        let response = JSON.stringify(qres.rows[0])
        console.log("JSON RESPONSE:", response)
        res.send(response)
    });
})
.get('/todo', (req, res) => res.sendFile(__dirname + '/todo/todo.html'))
.get('/signUp', (req, res) => {
    console.log("Trying to access sign up page");
})
.get('/logIn', (req, res) => {
    console.log("Trying to access log in page");
    res.render('signUp.html');
    res.send();
})
// Adding user below
.post('/addUser',(req, res) => {
    console.log("Adding the user");
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
