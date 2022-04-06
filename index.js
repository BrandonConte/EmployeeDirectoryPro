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
    password: 'Pino1122!',
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

function viewAllEmployees() {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.department_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON (roles.id = employees.role_id)
    INNER JOIN department ON (department.id = roles.department_id)
    ORDER BY employees.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
};

function viewAllRoles() {
    const query = `SELECT roles.title, employees.id, employees.first_name, employees.last_name, department.department_name AS department
    FROM employees
    LEFT JOIN roles ON (roles.id = employees.role_id)
    LEFT JOIN department ON (department.id = roles.department_id)
    ORDER BY roles.title;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        prompt();
    });

}

