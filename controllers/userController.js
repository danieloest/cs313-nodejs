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
function getTodoList(req, res) {
    let userid = req.session.userid;
    console.log("Getting to do list for " + userid);
    userModel.getTodoList(userid, function(results) {
        res.send(JSON.stringify(results))
    });
}

/**************************************************************
* Remove task from database
**************************************************************/
function removeTask(req, res, callback) {
    let taskId = req.body.taskId;
    userModel.removeTask(taskId, function() {
        console.log(__dirname + '/public/todo.html')
        // res.sendFile(__dirname + '/public/todo.html');
        res.send(true);
    });
}

/**************************************************************
* Add a task to the database
**************************************************************/
function addTask(req, res) {
    console.log("Adding the task in the controller!! WOOOO");
    let task = req.body.task;
    let userID = req.session.userid;
    userModel.addTask(task, userID, function () {
        res.send(true);
    });
}

function markCompletion(req, res) {
    let isChecked = req.body.isChecked;
    let taskID = req.body.taskID;
    userModel.markCompletion(taskID, isChecked, function() {
        res.send(true);
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
    getTodoList: getTodoList,
    removeTask : removeTask,
    addTask : addTask,
    markCompletion : markCompletion
};