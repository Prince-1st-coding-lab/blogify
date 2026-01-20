// Filename: app.js
const express = require('express');
const mysql = require('mysql2'); // Using mysql2 for modern features

// Create a connection to the database
const db= mysql.createConnection({
    host: 'localhost',      // The address of the MySQL server
    user: 'root',           // Your MySQL username
    password: '', // Your MySQL password
    database: 'blogify' // The database name
});

// Open the MySQL connection and start the Express server
db.connect(error => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);

});

module.exports = db;