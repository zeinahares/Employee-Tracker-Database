const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
);

db.connect((error) => {
    // include title - !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (error) throw error;
    promptUser();
});

// inquierer prompt
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
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

            if (choice === 'Add a Department') {
                addDepartment();
            }

            if (choice === 'Add a Role') {
                addRole();
            }

            if (choice === 'Add an Employee') {
                addEmployee();
            }
            // if add employee role



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
        console.log(' ');
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
        console.log(' ');
        console.log(' ');
        console.table(results);
        console.log(' ');
    });
    promptUser();
}

function viewAllDepartments() {
    db.query("SELECT id, name FROM department", function (err, results) {
        console.log(' ');
        console.log(' ');
        console.log(' ');
        console.table(results);
        console.log(' ');

    });
    promptUser();
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the department?',
        }
    ])
        .then((response) => {
            const query = `INSERT INTO department (name)
                        VALUES ("${response.departmentName}")`;
            db.query(query, function (err, results) { });
        })
        .then(() => promptUser());
};

function addRole() {

    db.query("SELECT name FROM department", function (err, results) {

        inquirer.prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of the role?',
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What is the salary?',
            },
            {
                name: 'departmentName',
                type: 'list',
                message: 'What is the department of the role?',
                choices: results,
            }
        ])
            .then((response) => {

                db.query(`SELECT id FROM department WHERE name = "${response.departmentName}"`, function (err, result) {
                    const query = `INSERT INTO role (title, salary, department_id)
                        VALUES ("${response.roleName}", ${response.roleSalary}, ${result[0].id})`;
                    db.query(query, function (err, results) { });
                });
            })
            .then(() => promptUser());

    });
};

function addEmployee() {

};
// XXX GIVEN a command-line application that accepts user input
// XXX THEN I am presented with the following options:
// XXX view all departments,
// XXX view all roles,
// XXX view all employees,
// XXX add a department,
// XXX add a role,
// XXX add an employee, and
// XXX update an employee role
// XXX WHEN I choose to view all departments
// XXX THEN I am presented with a formatted table showing department names and department ids
// XXX WHEN I choose to view all roles
// XXX THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// XXX WHEN I choose to view all employees
// XXX THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// XXX WHEN I choose to add a department
// XXX THEN I am prompted to enter the name of the department and that department is added to the database
// XXX WHEN I choose to add a role
// XXX THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 