DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role (id),
    FOREIGN KEY (manager_id)
    REFERENCES employee (id)
);

-- USE employee_tracker;
-- -- SHOW ALL EMPLOYEES
-- SELECT
-- employee.id,
-- employee.first_name,
-- employee.last_name,
-- role.title,
-- department.name AS department,
-- role.salary,
-- CONCAT(managers.first_name, ' ', managers.last_name) AS manager
-- FROM employee
-- JOIN role 
-- ON employee.role_id = role.id
-- JOIN department
-- ON role.department_id = department.id
-- LEFT JOIN employee managers
-- ON employee.manager_id = managers.id;
