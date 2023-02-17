const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'GitUser',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Use inquirer to display the following options: 
// view all departments, 
    // THEN I am presented with a formatted table showing department names and department ids
        // SELECT * FROM department;
// view all roles, 
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        // SELECT r.id, r.title, d.name, r.salary
        // FROM role AS r LEFT JOIN department AS d ON r.department_id = d.id;
// view all employees, 
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        // SELECT e.id AS 'ID', 
            // e.first_name AS 'First Name', 
            // e.last_name AS 'Last Name', 
            // r.title AS 'Role', 
            // d.name AS 'Department', 
            // r.salary AS 'Salary', 
            // CONCAT(man.first_name, ' ', man.last_name) AS Manager
        //  FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id
        //  LEFT JOIN department AS d ON r.department_id = d.id
        //  LEFT JOIN employee AS man ON e.manager_id = man.id;
// add a department, 
    // THEN I am prompted to enter the name of the department and that department is added to the database
// add a role, 
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// add an employee,
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// and update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database


// Bonus options:
    // Update employee managers.
    // View employees by manager.
    // View employees by department.
    // Delete departments, roles, and employees.
    // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
