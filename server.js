const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeetrackerDB',

});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    start();

});

start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Delete a department',
                'Delete role',
                'Delete employee',
                'Exit program',]
        }
    ])
        .then(answers => {
            switch (answers.options) {

                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addAnEmployee();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;

                case 'Exit program':
                    connection.end();
                    console.log('\n You have exited the employee management program. Thanks for using! \n');
                    return;
                default:
                    break;
            }
        })
}

viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

viewAllRoles = () => {
    connection.query('SELECT role.role_id, role.title, role_salary, department.department_name AS department ', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

viewAllEmployees = () => {
    connection.query('SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name, " ", manager.last_name)Manager FROM employee LEFT JOIN role ON employee.role_id = role.id  LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'Add new department',

        }
    ]).then(answers => {
        connection.query('INSERT INTO department SET ?',
            {
                department_name: answers.addDept,
            },
            (err, res) => {
                if (err) throw err;
                console.log('Department has been added!');
                start();
            }

        );
    });
};

addRole = () => {

    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What role do you want to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department is this role apart of?',
            choices: departments
        },
    ]).then((answers) => {
        connection.query('INSERT INTO role SET?'),
        {
            title: answers.title,
            salary: answers.salary,
            department_id: answer.department,
        },
            (err, res) => {
                if (err) throw err;
                console.log(`Employee role added!`);
                start();
            }
    });
};

addAnEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role',
            message: "Who is the new employee's role?",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the new employee's manager?",
            chocies: employee
        }
    ]).then((response) => {
        connection.query(`INSERT INTO employee SET ?`,
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager,
            },
            (err, res) => {
                if (err) throw err;
            })
        connection.query(`INSERT INTO role SET ?`,
            {
                department_id: response.dept,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`Employee has been added!`);
                start();
            })
    })
}
    deleteDepartment = () => {
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            const departments = res.map(dept => ({ name: dept.department_name, value: dept.department_id }))
            console.log(departments)
            console.log(res)
             start();
             inquirer.prompt([
                {   
                    type: 'list',
                    choices: departments,
                    name: 'deleteDept',
                    message: "Which department would you like to delete?",
                },
            ]).then((answers.deleteDepartment)) 
        })
    };
    
    deleteRole = () => {
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            const role = res.map(role => ({ name: role.title, value: role_id}))
            console.log(role)
            console.log(res)
             start();
             inquirer.prompt([
                {   
                    type: 'list',
                    choices: role,
                    name: 'deleteRole',
                    message: "Which role would you like to delete?",
                },
            ]).then((answers.deleteRole)) 
        })
    };
    deleteEmployee = () => {
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            const departments = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}))
            console.log(employee)
            console.log(res)
             start();
             inquirer.prompt([
                {   
                    type: 'list',
                    choices: employee,
                    name: 'deleteEmployee   ',
                    message: "Which employee would you like to remove?",
                },
            ]).then((answers.deleteEmployee)) 
        })
    };