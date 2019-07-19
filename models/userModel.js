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
        var sql = " INSERT INTO USERS(username, password) VALUES ($1::text, $2::text)";
        var params = [username, hash];
        pool.query(sql, params, function() {
            callback(null);         
        })
    });
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
        if (err) {
            throw err;
        }
        else {
            bcrypt.compare(password, db_results.rows[0].password, function(err, res) {
                // res == true
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
    var sql = "SELECT task, isCompleted, itemID FROM todoItems where userID=$1::integer ORDER BY itemID";
    var params = [userid];
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            throw err;
        }
        else {
            callback(db_results.rows);
            };
        });
}

/**************************************************************
* Remove task from database
**************************************************************/
function removeTask(taskId, callback) {
    var sql = "DELETE FROM todoItems WHERE itemID=$1::integer";
    var params = [taskId];
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            throw err;
        }
        else {
            callback();
            };
        });
}

/**************************************************************
* Add a task to the database
**************************************************************/
function addTask(task, userID ,callback) {
    var sql = "INSERT INTO todoItems (task, isCompleted, userID) VALUES ($1::text, FALSE, $2::integer);";
    var params = [task, userID];
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            throw err;
        }
        else {
            callback();
            };
        });
}

/**************************************************************
* Marks whether or not a task is compelted
**************************************************************/
function markCompletion(taskID, isChecked, callback) {
    var sql = "UPDATE todoItems SET isCompleted = $1::boolean WHERE itemID = $2::integer;";
    var params = [isChecked, taskID];
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            throw err;
        }
        else {
            callback();
            };
        });
}

/**************************************************************
* Get a user's userID
**************************************************************/
function getuserID(username, callback) {
    var sql = "SELECT userID FROM users WHERE username = $1::text;";
    var params = [username];
    pool.query(sql, params, function(err, db_results) {
        if (err) {
            throw err;
        }
        else {
            callback(db_results.rows[0].userid);
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
    removeTask : removeTask,
    addTask : addTask,
    markCompletion : markCompletion,
    getuserID : getuserID
};