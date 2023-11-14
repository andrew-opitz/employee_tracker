USE employee_tracker;
-- SHOW ALL EMPLOYEES
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
ON employee.manager_id = managers.id;

