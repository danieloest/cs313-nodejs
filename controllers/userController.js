const userModel = require("../models/userModel.js");
var path = require('path');



/**************************************************************
* Adds a user to the database
**************************************************************/
function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    req.session.loggedIn = true;
    req.session.username = username;            
    userModel.addUsertoDB(username, password, function(err) {
        if (err) {
            console.log("We're lost now....");
        }
        else {
            // Get the userID
            userModel.getuserID(username, function(userID){
                req.session.userid = userID;
                res.send(true);
            })
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
}

/**************************************************************
* Gets the todo list items
**************************************************************/
function getTodoList(req, res) {
    let userid = req.session.userid;
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
        res.send(true);
    });
}

/**************************************************************
* Add a task to the database
**************************************************************/
function addTask(req, res) {
    let task = req.body.task;
    let userID = req.session.userid;
    userModel.addTask(task, userID, function () {
        res.send(true);
    });
}

/**************************************************************
* Marks whether or not a task is compelted
**************************************************************/
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