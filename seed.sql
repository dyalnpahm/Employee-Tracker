INSERT INTO department (department_name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id )
VALUES('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 1200000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 12, NULL),
('Mike', 'Chan', 13, 1),
('Ashley', 'Rodriguez', 14, NULL),
('Kevin', 'Tupik', 3, 2),
('Kunal', 'Singh', 9, 2, NULL),
('Malia', 'Brown', 11, 2),
('Sarah', 'Lourd', 6, 2, NULL),
('Tom', 'Allen', 1, 4),
