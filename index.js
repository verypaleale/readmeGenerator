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
        type: "input", // !CHECK
        name: "license",
        message: "What kind of license should your project have?",
    },
    {
        type: "input", // !CHECK FOR DEFAULT OPTIONS (npm i)
        name: "commDepend",
        message: "What kind of command should be run to install dependencies?",
    },
    {
        type: "input", // !CHECK TO ADD DEFAULT (npm test)
        name: "commRun",
        message: "What type of command should be run to run tests?",
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
]).then(function(answer) { // !CHECK TO SEE IF IT ACTUALLY WORKS
    console.log(answer)

    const data = getData(answer);

    fs.writeFile("readme.md", data, function(err) {
        if(err) {
            return;
        };
        console.log("Success")
    });
});