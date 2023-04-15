const mysql = require('mysql2/promise');


const aws_conn = mysql.createPool({
    host: 'wichai-server-db.ctyetg9uawza.ap-southeast-2.rds.amazonaws.com',
    user: 'root', // Your user
    password: '#', // your Password
    database: 'project_db',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit:0
});

module.exports = aws_conn;