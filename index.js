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
            // return addRole
        }
        else if (staging.options === 'Add an Employee') {
            // return addEmployee
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
}

async function viewRole() {
    const [rows, data] = await db.query(`SELECT * FROM roles`);
    console.table(rows);
    initialPrompt();
}

async function viewEmployee() {
    const [rows, data] = await db.query(`SELECT * FROM employee`);
    console.table(rows);
    initialPrompt();
}

const addDepartment = dept => {
    dept = [];
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Dept',
            message: 'What is the name of the Department',
            validate: deptInput => {
                if(deptInput) {
                    return true;
                } else {
                    console.log('Please enter the Department name');
                    return false;
                }
            }
        }
    ])
    .then(deptData => {
        return queryDepartment(deptData['Dept']);
    });
}

async function queryDepartment(name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = await [name];
    const run = await db.query(sql, params);
}

initialPrompt()