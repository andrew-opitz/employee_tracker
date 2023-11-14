const mysql = require('mysql2')
const inquirer = require('inquirer')
const connection = require('./db/connection')
const consoleTable = require('console.table')

function init () {
connection.connect()
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'Employee Tracker',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee']
    
        }
    ])
    .then((response => {
        switch(response['Employee Tracker']) {
            case 'view all departments':
                viewDepartments()
                break
            case 'view all roles':
                viewRoles()
                break
            case 'view all employees':
                viewEmployees()
                break
            case 'add a department':
                addDepartment()
                break
            case 'add a role':
                addRole()
                break
            case 'add an employee':
                addEmployee()
                break
            case 'update employee':
                updateEmployee()
                break

                default:
                process.exit()
        }
    }))
}
init()
function viewDepartments() {
    connection.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.error('Error executing query:', error);
            return;
          }
        console.table(results)
    })
   
}