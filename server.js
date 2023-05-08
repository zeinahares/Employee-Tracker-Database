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

db.connect((error) => {
    if (error) throw error;
    promptUser();
});

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

            if (choice === 'View All Employees') {
                viewAllEmployees();
            }

            if (choice === 'View All Roles') {
                viewAllRoles();
            }

            if (choice === 'View All Departments') {
                viewAllDepartments();
            }

        });
}

function viewAllEmployees() {


}
function viewAllRoles() {

}
function viewAllDepartments() {
    db.query("SELECT id, name FROM department;", function (err, results) {

        // format the output as an array of objects
        // const formattedResults = results.map(result => {
        //     return {
        //         id: result.id,
        //         name: result.name
        //     };
        // });
// 
        // const formattedResults = {};
        // results.forEach(result => {
        //     formattedResults[result.id] = result.name;
        // });

        console.table(results);
    });
}