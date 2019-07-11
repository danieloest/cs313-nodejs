const userModel = require("../models/userModel.js");
var path = require('path')


function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    req.session.loggedIn = true;
    req.session.username = username;            
    console.log("Before setting");
    console.log("User: " + req.session.username);
    userModel.addUsertoDB(username, password, function(err) {
        // TODO: Figure out what to do after the user signs up and how to save that they're logged in.
        // Possibly cookies?
        // console.log("loggedIn: " + req.session.loggedIn);
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

function logIn(req, res, callback) {
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = userModel.authenticateUser(username, password, function(results) {
        // If they are authenticated, log them in
        if (results == true) {
            req.session.loggedIn = true;
            req.session.username = username;            
        }
        else {
            // TODO: show error messge on bad log in
        }
        callback();
    });
}

function getIsLoggedIn (req) {
    return req.session.loggedIn;
}

function logOut (req) {
    req.session.loggedIn = false;
    console.log("After logging out, LoggedIn is: " + req.session.loggedIn);
}

module.exports = {
    addUser: addUser,
    logIn: logIn,
    getIsLoggedIn: getIsLoggedIn,
    logOut: logOut
};