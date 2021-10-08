// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const markdown = require('./generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username',
    }, 
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your projects name?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please write a short description of your project',
        name: 'description',
    },
    {
        type: 'list',
        message: 'What kind of license should your project have?',
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'NONE'],
        name: 'license',
    },
    {
        type: 'input',
        messgae: 'What is this project to be used for?',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'What command should be run to install independencies?',
        name: 'installs',
    },
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'What does the user need to know about using the repo?',
        name: 'extra-info',
    },
    {
        type: 'input',
        message: 'What does the user need to know about contributing to the repo?',
        name: 'contributions',
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('README.md', markdown.generateMarkdown(JSON.parse(data)), err => {
        if(err) {
            console.log(err);
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {
        console.log('README has been generated!');
        writeToFile('README.md', JSON.stringify(data));
        markdown.renderLicenseBadge(data.license);
        markdown.renderLicenseLink(data.license);
        markdown.renderLicenseSection(data.license);
    })
    .catch((err) => {
        console.log('error', err);
    });
}

// Function call to initialize app
init();