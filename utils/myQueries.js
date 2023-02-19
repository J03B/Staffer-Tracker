// SQL queries to GET information
function getDepartments() {
    return 'SELECT * FROM department;';
}
function getRoles() {
    return `SELECT r.id, r.title, d.name, r.salary
        FROM role AS r LEFT JOIN department AS d ON r.department_id = d.id;`;
}
function getEmployees() {
    return `SELECT e.id AS 'ID',
            e.first_name AS 'First Name',
            e.last_name AS 'Last Name',
            r.title AS 'Role',
            d.name AS 'Department',
            r.salary AS 'Salary',
            CONCAT(man.first_name, ' ', man.last_name) AS 'Manager'
        FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id
        LEFT JOIN department AS d ON r.department_id = d.id
        LEFT JOIN employee AS man ON e.manager_id = man.id;`;
} 

// SQL queries to ADD new rows into the database
function addDepartment(dep) {
    return `INSERT INTO department (name)
        VALUES ("${dep}");`;
}
function addRole(roleName, salary, depID) {
    return `INSERT INTO role (title, salary, department_id)
        VALUES ("${roleName}", ${salary}, ${depID});`;
}
function addEmployee(fName, lName, roleID, managerID) {
    if (managerID == 0) {
        managerID = 'NULL';
    }
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${fName}", "${lName}", ${roleID}, ${managerID});`;
}

// SQL queries to SET current rows to update
function setEmployeeRole(empID, roleID) {
    return `UPDATE employee
        SET role_id = ${roleID}
        WHERE id = ${empID};`;
}

// BONUS QUERIES
// SQL queries for the bonus options
function setEmployeeManager(empID, manID) {
    return `UPDATE employee
        SET manager_id = ${manID}
        WHERE id = ${empID};`;
}
function getEmployeesByManager() {
    let initStr = getEmployees().slice(0, -1);
    return `${initStr}
        ORDER BY Manager;`;
}
function getEmployeesByDepartment() {
    let initStr = getEmployees().slice(0, -1);
    return `${initStr}
        ORDER BY Department;`;
}

// SQL queries for Bonus DELETE options
function deleteDepartment(depID) {
    return `DELETE FROM department WHERE id = ${depID};`;
}
function deleteRole(roleID) {
    return `DELETE FROM role WHERE id = ${roleID};`;
}
function deleteEmployee(empID) {
    return `DELETE FROM employee WHERE id = ${empID};`;
}

// SQL query for bonues GET salaries by department option
function getSalaryByDepartment(depID) {
    return `SELECT d.name AS 'Department Name',
            SUM(r.salary) AS 'Utilized Budget'
        FROM role AS r
        INNER JOIN department AS d ON r.department_id = d.id
        WHERE department_id = ${depID};`;
}

let allExports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    setEmployeeRole,
    setEmployeeManager,
    getEmployeesByManager,
    getEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    getSalaryByDepartment
};

module.exports = allExports;