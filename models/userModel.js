const bcrypt = require('bcrypt');
const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});
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

module.exports = {
	addUsertoDB: addUsertoDB
};