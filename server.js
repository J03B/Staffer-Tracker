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


// Initialize the application with Inquirer
function init() {
    inquirer.prompt(menuQuesitons).then((answers) => {
        
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log(`The prompt couldn't be rendered in the current environment: ${error}`);
        }
        else {
            console.log(`Unkown error: ${error}`);
        }
    });
}

init();