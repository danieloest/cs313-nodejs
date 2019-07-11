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
    // req.session.destroy();
}

module.exports = {
    addUser: addUser,
    logIn: logIn,
    getIsLoggedIn: getIsLoggedIn,
    logOut: logOut
};