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
    // console.log(`Connected to the employees_db database.`)
);

db.connect((error) => {
    // figlet and chalk title
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

            if (choice === 'Quit') {
                db.end();
            }

        });
}

function viewAllEmployees() {
    const query = `SELECT  emp.id, emp.first_name, emp.last_name, 
                    role.title, department.name AS department, role.salary,
                    CONCAT(man.first_name, ' ', man.last_name) AS manager
                    FROM employee emp
                    INNER JOIN role
                    ON role_id = role.id
                    INNER JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee man
                    ON emp.manager_id = man.id`;
    db.query(query, function (err, results) {
        console.log(' ');
        console.table(results);
        console.log(' ');
    });
    promptUser();
}

function viewAllRoles() {
    const query = `SELECT role.id, title, salary, department.name AS department 
                    FROM role 
                    JOIN department 
                    ON role.department_id = department.id`;
    db.query(query, function (err, results) {
        console.log(' ');
        console.table(results);
        console.log(' ');
    });
    promptUser();
}

function viewAllDepartments() {
    db.query("SELECT id, name FROM department", function (err, results) {
        console.log(' ');
        console.table(results);
        console.log(' ');

    });
    promptUser();
}