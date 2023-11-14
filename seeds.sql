USE employee_tracker;

INSERT INTO department (name) VALUES
('Shipping');

INSERT INTO role (title, salary, department_id) VALUES
('boxer', 50000, 1);

INSERT INTO employee (
    first_name,
    last_name,
    role_id,
    manager_id
) VALUES
('Mike', 'Myers', 1, NULL),
('Freddy', 'Krueger', 1, NULL),
('Jason', 'Vorhees', 1, NULL),
('Scream', 'Guy', 1, NULL),
('Green', 'Goblin', 1, 1)