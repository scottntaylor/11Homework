var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "employeeTracker_DB",
    database: "sunday1194"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "Options",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
        })
        .then(function(answer){
            if (answer.Options === "View All Employees"){
                viewEmployees();
            }
            else if(answer.Options === "View All Employees by Department"){
                viewByDepartment();
            }
            else if(answer.Options === "View All Employees by Manager"){
                viewByManager();
            }
            else if (answer.Options === "Add Employee"){
                addEmployee();
            }
            else if (answer.Options === "Remove Employee"){
                removeEmployee();
            }
            else if (answer.Options === "Update Employee Role"){
                updateEmployeeRole();
            }
            else if (answer.Options === "Update Employee Manager"){
                updateEmployeeManager();
            }
            else{
                connection.end();
            }

        })
}

function viewEmployees(){

}
function viewByDepartment(){

}
function viewByManager(){

}
function addEmployee(){

}
function removeEmployee(){

}
function updateEmployeeRole(){

}
function updateEmployeeManager(){
    
}
