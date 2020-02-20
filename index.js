const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileSync = util.promisify(fs.writeFile);

inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "What is your GitHub username"
    },
    {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
    },
    {
        type: "input",
        name: "projDescr",
        message: "Please write a short description of your project.",
    },
    {
        type: "list", // !CHECK
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["Mozilla", "Apache", "MIT", "GPL 3.0"]
    },
    {
        type: "input", // 
        name: "commDepend",
        message: "What kind of command should be run to install dependencies?",
        default: "npm i",
    },
    {
        type: "input", 
        name: "commRun",
        message: "What type of command should be run to run tests?",
        default: "npm test",
    },
    {
        type: "input",
        name: "userKnow",
        message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "userContr",
        message: "What does the user need to know out contributing to the repo?",
    }
]);

promptUser()
    .then(function(answers) {
        if(answers.license === "Mozilla") {
            answersURL = "https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg"
        }
        if(answers.license === "Apache") {
            answersURL = "https://img.shields.io/badge/License-Apache%202.0-blue.svg"
        }
        if(answers.license === "MIT") {
            answersURL = "https://img.shields.io/badge/License-MIT-yellow.svg"
        }
        if(answers.license === "GPL 3.0") {
            answersURL = "https://img.shields.io/badge/License-GPLv3-blue.svg"
    
    });

function generateReadme(response, answers, answersURL){
    return `
    # ${answers.projectName}
  [![License](${answersURL})](${response.html_url}/${answers.projectName})
  ​
  ## Description
  ​
  ${answers.projDescr}
  ​
  ## Table of Contents 
  * [Installation](#installation)
  ​
  * [Usage](#usage)
  ​
  * [License](#license)
  ​
  * [Contributing](#contributing)
  ​
  * [Tests](#tests)
  ​
  * [Questions](#questions)
  ​
  ## Installation
  ​
  To install necessary dependencies, run the following command:
  \`\`\`
  ${answers.commDepend}
  \`\`\`
  ## Usage
  ​
  ${answers.userKnow}
  ​
  ## License
  ​
  This project is licensed under the ${answers.license} license.
    
  ## Contributing
  ​
  ${answers.userContr}
  ​
  ## Tests
  ​
  To run tests, run the following command:
  \`\`\`
  ${answers.commRun}
  \`\`\`
 
  ## Questions
  ​
  <img src="${response.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
  ​
  If you have any questions about the repo, contact [${response.login}](${response.html_url}).`;
};