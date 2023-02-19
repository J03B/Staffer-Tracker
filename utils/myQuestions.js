// We will use inquirer to display the following options: 
const menuQuesitons = [
    {
        type: 'list',
        name: 'menuOptions',
        message: 'What would you like to do?',
        choices: [
            'View Data',
            'Add Data',
            'Update Employee Record',
            'Delete Data',
            'Quit'
        ]
    }
];
const viewQuestions = [
    {
        type: 'list',
        name: 'viewData',
        message: 'What information would you like to see?',
        choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees By ID',
            'View All Employees by Manager',
            'View All Employees by Department',
            "View a department's utilized budget"
        ]
    }
];
const addQuestions = [
    {
        type: 'list',
        name: 'addData',
        message: 'What information would you like to add?',
        choices: [
            'Add a Department', 
            'Add a Role', 
            'Add an Employee'
        ]
    }
];
const updateQuestions = [
    {
        type: 'list',
        name: 'updateData',
        message: 'What information would you like to update?',
        choices: [
            'Update an Employee Role',
            "Update an Employee's Manager"
        ]
    }
];
const deleteQuestions = [
    {
        type: 'list',
        name: 'deleteData',
        message: 'What information would you like to delete?',
        choices: [
            'Delete a Department',
            'Delete a Role',
            'Delete an Employee'
        ]
    }
];

module.exports = { 
    menuQuesitons, 
    viewQuestions, 
    addQuestions, 
    updateQuestions, 
    deleteQuestions
}