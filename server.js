const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'boot2023',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// inquierer prompt
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select an option:',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Quit'
            ]
        }
    ])
        .then((response) => {
            const choice = response.choices;

            if (choices === 'View All Employees') {
                viewAllEmployees();
            }

            if (choices === 'View All Roles') {
                viewAllRoles();
            }

            if (choices === 'View All Departments') {
                viewAllDepartments();
            }

        });
}

function viewAllEmployees() {
    
}
function viewAllRoles() {

}
function viewAllDepartments() {

}