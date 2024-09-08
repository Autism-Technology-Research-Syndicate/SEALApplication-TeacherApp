const mysql = require('mysql2/promise');

// connect mysql
const db = mysql.createPool({
    // host: process.env.MSQYL_HOST,     
    // user: process.env.MYSQL_USER,          
    // password: process.env.MYSQL_PASSWORD,  
    // database: process.env.MYSQL_DB,   




  });
// export db
module.exports = db;