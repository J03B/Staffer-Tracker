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

// Validation funcitons for inquirer that responses are not empty
function notEmpty(response) {
    if (response !== '') {
        return true;
    }
    return 'Must contain at least one character';
}
function isNumber(response) {
    if (String(response).match(/\d/)) {
        return true;
    }
    return 'Must contain a number';
}

// Function to handle any query
function sendQuery(sqlString) {
    db.query(sqlString, function(_err, results, _fields) {
        console.log('\n');
        if (_err) {
            console.log("Error - please contact your system administrator:\n" + _err);
            console.log(_fields);
        }
        console.table(results);
        console.log('\n\n');
        init();
    });
}

// Function to inquire a department and run an input function
function toggleDepratments(inFunc) {
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
                sendQuery(inFunc(deptId));
            });
    });
}

// ADD DEPARTMENT
function addDept() {
    let retStr;
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the department?',
            validate: (answer) => notEmpty(answer)
        }
    ])
        .then((answer) => {
            retStr = queries.addDepartment(answer.deptName);
            sendQuery(retStr);
        });
    return retStr;
}

// ADD ROLE
function addRole() {
    let retStr;
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
            name: 'roleDept',
            message: 'In which department is this role?',
            choices: allDepts
        };
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: `What is the role's title?`,
                validate: (answer) => notEmpty(answer)
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: `What is this role's salary?`,
                validate: (answer) => isNumber(answer)
            },
            deptQuestion
        ])
        .then((answers) => {
            const {roleName, roleSalary, roleDept} = answers;
            deptId = deptIdsIndex[allDepts.findIndex((val) => val == roleDept)];
            retStr = queries.addRole(roleName, roleSalary, deptId);
            sendQuery(retStr);
        });
    });
    return retStr;
}

// ADD EMPLOYEE
function addEmp() {
    let retStr;
    let roleId = 0;
    let manId = 0;
    let allRoles = [];
    let allEmps = [];
    let roleIdsIndex = [];
    let empIdsIndex = [];
    const empQuestions = [
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`,
            validate: (answer) => notEmpty(answer)
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`,
            validate: (answer) => notEmpty(answer)
        }
    ]
    db.query(queries.getRoles(), function (_err, results) {
        results.forEach(role => {
            allRoles.push(role.title);
            roleIdsIndex.push(role.id);
        });
        empQuestions.push({
            type: 'list',
            name: 'empRole',
            message: `What is the employe's role?`,
            choices: allRoles
        });
    });
    db.query(queries.getEmployees(), function (_err, results) {
        results.forEach(emp => {
            allEmps.push(`${emp["First Name"]} ${emp["Last Name"]}`);
            empIdsIndex.push(emp.ID);
        });
        empQuestions.push({
            type: 'list',
            name: 'empMan',
            message: `Who is the employe's manager?`,
            choices: allEmps
        });
        inquirer.prompt(empQuestions)
            .then((answers) => {
                const { firstName, lastName, empRole, empMan } = answers;
                roleId = roleIdsIndex[allRoles.findIndex((val) => val == empRole)];
                manId = empIdsIndex[allEmps.findIndex((val) => val == empMan)];
                retStr = queries.addEmployee(firstName, lastName, roleId, manId);
                sendQuery(retStr);
            });
    });
    
    return retStr;
}

// UPDATE EMPLOYEE RECORD ROLE
function updateEmpRole() {

}

// UPDATE EMPLOYEE RECORD MANAGER
function updateEmpManager() {
    
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
                    toggleDepratments(queries.getSalaryByDepartment);
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
                    addDept();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmp();
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
                    updateEmpRole();
                    break;
                case "Update an Employee's Manager":
                    updateEmpManager();
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
                    toggleDepratments(queries.deleteDepartment);
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