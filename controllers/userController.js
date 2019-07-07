const userModel = require("../models/userModel.js");


function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.addUsertoDB(username, password, function(results) {
        // TODO: Figure out what to do after the user signs up and how to save that they're logged in.
        // Possibly cookies?
        res.redirect('/todo?username=' + username); 
    });
    
}

function logIn(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = userModel.authenticateUser(username, password, function(results) {
        console.log(results);
    });
    console.log("Username: " + username);
    console.log("password: " + password);
}

module.exports = {
    addUser: addUser,
    logIn: logIn
};