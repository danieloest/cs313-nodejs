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
        console.log(hash);
        var sql = " INSERT INTO USERS(username, password) VALUES ($1::text, $2::text)";
        var params = [username, hash];
        pool.query(sql, params, function() {
            console.log("In query function");
        })
    });
    var results = {success: true};
    callback(results);         
}

/********************************************************
* Authenticates the user by checking if the password
* provided is the right password for the username
*  passed in
********************************************************/
function authenticateUser(username, password, callback) {
    var sql = "SELECT password FROM users WHERE username=$1::text";
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
                if (res == true)
                    results = true;
                else results = false;
                callback(results);
            });
        }
    })
}

module.exports = {
    addUsertoDB: addUsertoDB,
    authenticateUser: authenticateUser
};