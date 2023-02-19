// Import the various packages needed for this application
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const queries = require('./utils/myQueries');
const { menuQuesitons,viewQuestions,addQuestions,updateQuestions,deleteQuestions} = require('./utils/myQuestions');

// Connect to the MySQL database with custom user: GitUser
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'GitUser',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Function to handle any query
function sendQuery(sqlString) {
    db.query(sqlString, function(_err, results, _fields) {
        console.log('\n');
        console.table(results);
        console.log('\n\n\n\n\n');
    });
    init();
}

// Function to inquire a department and run an input function
function toggleDepratments() {
    db.query(queries.getDepartments(), function (_err, results) {
        let deptId = 0;
        let allDepts = [];
        let deptIdsIndex = [];
        results.forEach(dept => {
            allDepts.push(dept.name);
            deptIdsIndex.push(dept.id);
        });
        const deptQuestion = {
            type: 'list',
            name: 'deptName',
            message: 'Which department?',
            choices: allDepts
        };
        inquirer.prompt(deptQuestion)
            .then((answers) => {
                deptId = deptIdsIndex[allDepts.findIndex((val) => val == answers.deptName)];
                sendQuery(queries.getSalaryByDepartment(deptId));
            });
    });
}

// Initialize the application with Inquirer
function init() {
    // Function to display any VIEW data options
    function viewMenu() {
        inquirer.prompt(viewQuestions)
        .then((answers) => {
            switch (answers.viewData) {
                case 'View All Departments':
                    sendQuery(queries.getDepartments());
                    break;
                case 'View All Roles':
                    sendQuery(queries.getRoles());
                    break;
                case 'View All Employees By ID':
                    sendQuery(queries.getEmployees());
                    break;
                case 'View All Employees by Manager':
                    sendQuery(queries.getEmployeesByManager());
                    break;
                case 'View All Employees by Department':
                    sendQuery(queries.getEmployeesByDepartment());
                    break;
                case "View a department's utilized budget":
                    toggleDepratments();
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    function addMenu() {
        inquirer.prompt(addQuestions)
        .then((answers) => {
            switch (answers.addData) {
                case 'Add a Department':
                    break;
                case 'Add a Role':
                    break;
                case 'Add an Employee':
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    function updateMenu() {
        inquirer.prompt(updateQuestions)
        .then((answers) => {
            switch (answers.updateData) {
                case 'Update an Employee Role':
                    break;
                case "Update an Employee's Manager":
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    function deleteMenu() {
        inquirer.prompt(deleteQuestions)
        .then((answers) => {
            switch (answers.deleteData) {
                case 'Delete a Department':
                    break;
                case 'Delete a Role':
                    break;
                case 'Delete an Employee':
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    function main() {
        inquirer.prompt(menuQuesitons)
        .then((answers) => {
            switch (answers.menuOptions) {
                case 'View Data':
                    viewMenu();
                    break;
                case 'Add Data':
                    addMenu();
                    break;
                case 'Update Employee Record':
                    updateMenu();
                    break;
                case 'Delete Data':
                    deleteMenu();
                    break;
                default:
                    db.end();
                    console.log("Goodbye!");
                    break;
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    }

    main();
}

init();