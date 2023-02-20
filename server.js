const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeetrackerDB',

});

connection.connect(function(err){
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    start();

});

start = () => {
    inquirer.createPromptModule([
        {
            type: 'list',
            name: 'Options',
            message: 'What would you like to do?',
            choices:[
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit program',]
            }
            ])
.then(answers => {
    switch(answers.start){

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
            addADepartment();
            break;
        case 'Add a role':
            addARole();
            break;
        case 'Add an employee':
            addAnEmployee();
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


    



