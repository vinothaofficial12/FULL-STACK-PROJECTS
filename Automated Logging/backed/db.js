
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',            // your MySQL username
    password: 'vinotha@2125', // your MySQL password
    database: 'login_db'
});

module.exports = pool.promise();