const userModel = require("../models/userModel.js");


function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.addUsertoDB(username, password, function(results) {
        res.redirect('/todo?username=' + username); 
    });
    
}

module.exports = {
    addUser: addUser
};