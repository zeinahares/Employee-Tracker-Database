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
                "Update an Employee's Manager",
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

            if (choice === 'Update an Employee Role') {
                updateEmployeeRole();
            }

            if (choice === "Update an Employee's Manager") {
                updateEmployeeManager();
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
        promptUser();
    });

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
        promptUser();
    });

}

function viewAllDepartments() {
    db.query("SELECT id, name FROM department", function (err, results) {
        console.log(' ');
        console.table(results);
        console.log(' ');
        promptUser();
    });

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
            db.query(query, function (err, results) {
                console.info(`Added ${response.departmentName} to database`);
                promptUser();
            });
        });
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
                    db.query(query, function (err, results) {
                        console.log(`Added ${response.roleName} to database`);
                        promptUser()
                    });
                });
            });

    });
};

function addEmployee() {

    db.query("SELECT * FROM role", function (err, rolesIDArray) {
        const roles = rolesIDArray.map(({ id, title }) => ({ name: title, id: id }));
        db.query("SELECT * FROM employee", function (err, managersIDArray) {

            const managers = managersIDArray.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, id: id }));
            const nullManager = {
                name: "None",
                id: null,
            }
            managers.push(nullManager);

            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'What is the first name of the employee?',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the last name of the employee?',
                },
                {
                    name: 'roleName',
                    type: 'list',
                    message: 'What is the role of the employee?',
                    choices: roles,
                },
                {
                    name: 'managerName',
                    type: 'list',
                    message: 'Who is the manager of the employee?',
                    choices: managers,
                }
            ])
                .then((response) => {

                    const role_ID = roles.filter(function (element) {
                        if (element.name === response.roleName) {
                            return element.id
                        }

                    });

                    let query;
                    if (response.managerName != 'None') {
                        const manager_ID = managers.filter(function (element) {
                            if (element.name === response.managerName) {
                                return element.id
                            }

                        });

                        query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES ("${response.first_name}", "${response.last_name}", ${role_ID[0].id}, ${manager_ID[0].id})`;
                    } else {
                        query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES ("${response.first_name}", "${response.last_name}", ${role_ID[0].id}, NULL)`;
                    }

                    db.query(query, function (err, results) {
                        console.log(`Added ${response.first_name} ${response.last_name} to database`);
                        promptUser()
                    });
                });
        });
    });
};

function updateEmployeeRole() {

    // select an employee to update and their new role and this information is updated in the database 
    db.query("SELECT * FROM role", function (err, rolesIDArray) {
        const roles = rolesIDArray.map(({ id, title }) => ({ name: title, id: id }));
        db.query("SELECT * FROM employee", function (err, employeesIDArray) {

            const employees = employeesIDArray.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, id: id }));
            inquirer.prompt([

                {
                    name: 'employeeName',
                    type: 'list',
                    message: 'Which employee do you want to change roles for?',
                    choices: employees,
                },
                {
                    name: 'roleName',
                    type: 'list',
                    message: 'What is the new role of the employee?',
                    choices: roles,
                }
            ])
                .then((response) => {

                    const role_ID = roles.filter(function (element) {
                        if (element.name === response.roleName) {
                            return element.id
                        }

                    });

                    const employee_ID = employees.filter(function (element) {
                        if (element.name === response.employeeName) {
                            return element.id
                        }

                    });

                    const query = `UPDATE employee
                    SET role_id = ${role_ID[0].id}
                    WHERE id = ${employee_ID[0].id}`;

                    db.query(query, function (err, results) {
                        console.log(`Updated ${response.employeeName} in the database`);
                        promptUser()
                    });
                });
        });
    });
};

function updateEmployeeManager() {
    db.query("SELECT * FROM employee", function (err, employeesIDArray) {

        const employees = employeesIDArray.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, id: id }));
        inquirer.prompt([

            {
                name: 'employeeName',
                type: 'list',
                message: 'Which employee do you want to change managers for?',
                choices: employees,
            },
            {
                name: 'managerName',
                type: 'list',
                message: 'Who is the new manager of the employee?',
                choices: employees,
            }
        ])
            .then((response) => {

                const manager_ID = employees.filter(function (element) {
                    if (element.name === response.managerName) {
                        return element.id
                    }

                });

                const employee_ID = employees.filter(function (element) {
                    if (element.name === response.employeeName) {
                        return element.id
                    }

                });



                const query = `UPDATE employee
                SET manager_id = ${manager_ID[0].id}
                WHERE id = ${employee_ID[0].id}`;

                db.query(query, function (err, results) {
                    console.log(`Updated ${response.employeeName} in the database`);
                    promptUser();
                });
            });
    });
};