const mysql = require('mysql2')
const inquirer = require('inquirer')
const connection = require('./db/connection')
const consoleTable = require('console.table')


const question = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'Employee Tracker',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee']

}
function init () {
connection.connect()
    inquirer.prompt(question)
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
                
        }
        
    }))
}
init()
function viewDepartments() {
    connection.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.error('Error executing query:', err)
            return
          }
          console.table(results)
          init()
        })

}

function viewRoles() {
	connection.query('SELECT * FROM role;', (err, results) => {
		if (err) {
			console.error('Error executing query:', err)
			return
			}
		console.table(results)
        init()
        })

}

function viewEmployees() {
    connection.query(`
    SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employee
    JOIN role 
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee managers
    ON employee.manager_id = managers.id;`, (err, results) => {
        if (err) {
			console.error('Error executing query:', err)
			return
			}
		console.table(results)
        init()
    })
    
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'Please enter the name of the department'
    }).then((response => {
        const dName = response.department
        const toDo = 'INSERT INTO department (name) VALUES(?)'
        connection.query(toDo, [dName], (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
			return
            }
            console.table(results)
            init()
        })
        
    }
    ))
    
}

function addRole() {
    connection.query('SELECT id, name FROM department;', (err, results) => {
        if (err) {
            console.error('Error executing the query', err)
            return
        }
        const choices = results.map((row) => ({
            name: `${row.name}`,
            value: row.id,
        }))
          inquirer.prompt([
              {
                  type: 'input',
                  name: 'name',
                  message: 'Please enter the name of the role.'
                }, {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter thr salary for the role.'
                }, {
                    type: 'list',
                    name: 'department',
                    message: 'Please select the department for the role.',
                    choices: choices
                }])
                .then((response => {
                    const roleName = response.name
                    const salary = response.salary
                    const depart = response.department
                    const toAdd = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
                    connection.query(toAdd, [roleName, salary, depart], (err, results) => {
                        
                        console.table(results)
                        init()
                    })
                }))
            })
            }

function addEmployee() {

}

function updateEmployee() {

}