const userModel = require("../models/userModel.js");
var path = require('path')


/**************************************************************
* Adds a user to the database
**************************************************************/
function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    req.session.loggedIn = true;
    req.session.username = username;            
    console.log("Before setting");
    console.log("User: " + req.session.username);
    userModel.addUsertoDB(username, password, function(err) {
        if (err) {
            console.log("We're lost now....");
        }
        else {
            // Redirect to /todo
            console.log("Dir name: " + path.join(__dirname, '../'));
            res.sendFile(path.join(__dirname, '../') + '/public/todo.html');
        }
    });
    
}

/**************************************************************
* Log a user in
**************************************************************/
function logIn(req, res, callback) {
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = userModel.authenticateUser(username, password, function(results) {
        // If they are authenticated, log them in
        if (results.success == true) {
            req.session.loggedIn = true;
            req.session.username = username;
            req.session.userid = results.userid;            
        }
        else {
            // TODO: show error messge on bad log in
        }
        callback();
    });
}

/**************************************************************
* Get a bool representing whether or not the user is logged in
**************************************************************/
function getIsLoggedIn (req) {
    return req.session.loggedIn;
}

/**************************************************************
* Logs the user out
**************************************************************/
function logOut (req) {
    req.session.loggedIn = false;
    req.session.userid = -1;
    console.log("After logging out, LoggedIn is: " + req.session.loggedIn);
}

/**************************************************************
* Gets the todo list items
**************************************************************/
function getTodoList(req) {
    let userid = req.session.userid;
    console.log("Getting to do list for " + userid);
    userModel.getTodoList(userid, function(results) {

    });
}

/**************************************************************
* Export the functions
**************************************************************/
module.exports = {
    addUser: addUser,
    logIn: logIn,
    getIsLoggedIn: getIsLoggedIn,
    logOut: logOut,
    getTodoList: getTodoList
};