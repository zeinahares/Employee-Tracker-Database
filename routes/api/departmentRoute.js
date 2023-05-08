const deparment = require('express').Router();
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'boot2023',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

app.get('/', ({ body }, res) => {

  });
module.exports = deparment;