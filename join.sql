SELECT employee.employee_id AS id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name, department.department_name AS department
FROM employee
INNER JOIN role ON employee.role_id=role.role_id
INNER JOIN department ON role.department_id=department.department_id
INNER JOIN employee as manager ON employee.manager_id=manager.employee_id;
