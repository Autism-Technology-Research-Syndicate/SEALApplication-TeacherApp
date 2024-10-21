const mysql = require('mysql2/promise');

// connect mysql
const db = mysql.createPool({
    // host: process.env.MSQYL_HOST,     
    // user: process.env.MYSQL_USER,          
    // password: process.env.MYSQL_PASSWORD,  
    // database: process.env.MYSQL_DB,   
    host: "localhost",
    user: "root",
    password: "Wukong0987#",
    database: "test_schema"

  });
// export db
module.exports = db;