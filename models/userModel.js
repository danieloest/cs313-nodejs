const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

/********************************************************
* Adds a user to the database using the credentials they
* pass in
********************************************************/
function addUsertoDB(username, password, callback) {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            throw Error = new Error("....we done goofed. Can't add to database");
        }
        console.log(hash);
        var sql = " INSERT INTO USERS(username, password) VALUES ($1::text, $2::text)";
        var params = [username, hash];
        pool.query(sql, params, function() {
            console.log("In query function");
        })
    });
    callback(null);         
}

/********************************************************
* Authenticates the user by checking if the password
* provided is the right password for the username
*  passed in
********************************************************/
function authenticateUser(username, password, callback) {
    var sql = "SELECT password, userid FROM users WHERE username=$1::text";
    var params = [username];
    pool.query(sql, params, function(err, db_results) {
        console.log("In query function");
        if (err) {
            throw err;
        }
        else {
            console.log(db_results.rows[0].password);
            bcrypt.compare(password, db_results.rows[0].password, function(err, res) {
                // res == true
                console.log("DB hash: " + db_results.rows[0].password);
                console.log("User id: " + db_results.rows[0].userid);
                if (res == true)
                    results = {success: true, userid: db_results.rows[0].userid};
                else results = false;
                callback(results);
            });
        }
    })
}

/**************************************************************
* Gets the todo list items
**************************************************************/
function getTodoList(userid, callback) {
    console.log("Loading to do list.... in model! For user: " + userid);
    var sql = "SELECT task, isCompleted, itemID FROM todoItems where userID=$1::integer";
    var params = [userid];
    pool.query(sql, params, function(err, db_results) {
        console.log("In query function");
        if (err) {
            throw err;
        }
        else {
            // console.log(db_results.rows);
            callback(db_results.rows);
            };
        });
}

/**************************************************************
* Remove task from database
**************************************************************/
function removeTask(taskId, callback) {
    console.log("Removing this task yo");
    console.log("Task id: " + taskId);
    var sql = "DELETE FROM todoItems WHERE itemID=$1::integer";
    var params = [taskId];
    pool.query(sql, params, function(err, db_results) {
        console.log("In query function");
        if (err) {
            throw err;
        }
        else {
            // console.log(db_results.rows);
            callback();
            };
        });
}

/**************************************************************
* Export the functions
**************************************************************/
module.exports = {
    addUsertoDB: addUsertoDB,
    authenticateUser: authenticateUser,
    getTodoList : getTodoList,
    removeTask : removeTask
};