const userModel = require("../models/userModel.js");


function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.addUsertoDB(username, password, function(results) {
        // TODO: Figure out what to do after the user signs up and how to save that they're logged in.
        // Possibly cookies?
        
    });
    
}

function logIn(req, res, callback) {
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = userModel.authenticateUser(username, password, function(results) {
        console.log(results);
        // If they are authenticated, log them in
        if (results == true) {
            console.log("Logged in!");
            req.session.loggedIn = true;
            // return true;
            // res.sendFile(__dirname + '/../public/todo.html')
            
        }
        else {
            // results == false;
            // return false;
        }
        callback();
    });
    console.log("Username: " + username);
    console.log("password: " + password);
}

function getIsLoggedIn (req) {
    return req.session.loggedIn;
}

module.exports = {
    addUser: addUser,
    logIn: logIn,
    getIsLoggedIn: getIsLoggedIn
};