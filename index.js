const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const fs = require("fs");
const db = require('./db/connection');

const initialPrompt = staging => {
    staging = [];
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee']
        }
    ])
    .then(staging => {
        if (staging.options === 'View All Departments') {
            return viewDepartment();
        }
        else if (staging.options === 'View All Roles') {
            return viewRole();
        }
        else if (staging.options === 'View All Employees') {
            return viewEmployee();
        }
        else if (staging.options === 'Add a Department') {
            return addDepartment();
        }
        else if (staging.options === 'Add a Role') {
            return addRole();
        }
        else if (staging.options === 'Add an Employee') {
            return addEmployee();
        }
        else if (staging.options === 'Update an Employee') {
            // return updateEmployee
        }

    });
};

async function viewDepartment() {
    const [rows, data] = await db.query(`SELECT * FROM department`);
    console.table(rows);
    initialPrompt();
};

async function viewRole() {
    const [rows, data] = await db.query(`SELECT * FROM roles LEFT JOIN department ON roles.department_id = department.department_id`);
    console.table(rows);
    initialPrompt();
};

async function viewEmployee() {
    const [rows, data] = await db.query(`SELECT * FROM employee LEFT JOIN roles ON employee.role_id = roles.role_id LEFT JOIN department ON roles.department_id = department.department_id`);
    console.table(rows);
    initialPrompt();
};

const addDepartment = dept => {
    dept = [];
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Dept',
            message: 'What is the name of the Department'
        }
    ])
    .then(deptData => {
        return queryDepartment(deptData['Dept']);
    });
};

const addRole = role => {
    role = [];
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Title',
            message: 'What is the title of the Role',
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log('Please enter the Role title');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'Salary',
            message: 'What is the salary of the Role',
            validate: salaryInput => {
                if(salaryInput) {
                    return true;
                } else {
                    console.log('Please enter the Role salary');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'Department',
            message: 'What is the Department id of the Role'

        }
    ])
    .then(roleData => {
        return queryRoles(roleData['Title'], roleData['Salary'], roleData['Department']);
    });
};

const addEmployee = employee => {
    employee = [];
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first_name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last_name'
        },
        {
            type: 'number',
            name: 'Role',
            message: 'What is the Role id'

        },
        {
            type: 'number',
            name: 'Manager',
            message: 'What is the Manager id'

        }
    ])
    .then(employeeData => {
        return queryEmployee(employeeData['first_name'], employeeData['last_name'], employeeData['Role'], employeeData['Manager']);
    });
};

async function queryDepartment(name) {
    const sql = `INSERT INTO department name VALUES ("${name}")`;
    const params = [name];
    await db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    initialPrompt();

};

async function queryRoles(title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`;
    const params = [title, salary, department_id];
    await db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    initialPrompt();

};

async function queryEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})`;
    const params = [first_name, last_name, role_id, manager_id];
    await db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    });

    initialPrompt();
};

initialPrompt();