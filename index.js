const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const employeePrompt = {
    viewAllEmployees: "View All Employees",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};
// Enter password below for your mySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    // Default port
    port: 3306,
    user: 'root',
    password: 'PassHERE',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    prompt();
});

function prompt() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                employeePrompt.viewAllEmployees,
                employeePrompt.viewAllRoles,
                employeePrompt.addEmployee,
                employeePrompt.removeEmployee,
                employeePrompt.updateRole,
                employeePrompt.exit
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.action) {
                case employeePrompt.viewAllEmployees:
                    viewAllEmployees();
                    break;

                case employeePrompt.addEmployee:
                    addEmployee();
                    break;

                case employeePrompt.removeEmployee:
                    remove('delete');
                    break;

                case employeePrompt.updateRole:
                    remove('roles');
                    break;

                case employeePrompt.viewAllRoles:
                    viewAllRoles();
                    break;

                case employeePrompt.exit:
                    connection.end();
                    break;
            }
        });
}