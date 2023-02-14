const mysql = require("mysql")
const dbConfig = require("../config/db.config");

//Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open the MYSQL connection
connection.connect(error => {
    if (error);
    console.log("Retsene, we are phakathi inside");
});

module.exports = connection;