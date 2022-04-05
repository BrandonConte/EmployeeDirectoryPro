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
