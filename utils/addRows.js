// Packages we need
const inquirer = require('inquirer');
const myQueries = require('./myQueries');

// Validation funciton that response is not empty
function notEmpty(response) {
    if (response !== '') {
        return true;
    }
    return 'Must contain at least one character';
}
function isNumber(response) {
    if (response.match(/\d/)) {
        return true;
    }
    return 'Must contain a number';
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
            retStr = myQueries.addDepartment(answer.deptName);
        });
    return retStr;
}

// ADD ROLE
function addRole() {
    let retStr;
    db.query(myQueries.getDepartments(), function (_err, results) {
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
            retStr = myQueries.addRole(roleName, roleSalary, roleDept)
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
    db.query(myQueries.getRoles(), function (_err, results) {
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
    db.query(myQueries.getEmployees(), function (_err, results) {
        results.forEach(emp => {
            allEmps.push(`${emp["First Name"]} ${emp["Last Name"]}`);
            empIdsIndex.push(emp.id);
        });
        empQuestions.push({
            type: 'list',
            name: 'empMan',
            message: `Who is the employe's manager?`,
            choices: allEmps
        });
    });

    inquirer.prompt(empQuestions)
    .then((answers) => {
        const { firstName, lastName, empRole, empMan } = answers;
        roleId = roleIdsIndex[allRoles.findIndex((val) => val == empRole)];
        manId = empIdsIndex[allEmps.findIndex((val) => val == empMan)]
        retStr = myQueries.addEmployee(firstName, lastName, roleId, manId)
    });
    return retStr;
}

module.exports = { addDept, addRole, addEmp }