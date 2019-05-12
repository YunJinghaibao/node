const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'jy1224',
    database: 'project',
});
// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     port: '3306',
//     password: '123456',
//     database: 'project',
// });
connection.connect();
module.exports = connection;
