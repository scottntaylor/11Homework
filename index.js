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
    password: "sunday1194",
    database: "employeeTracker_DB"
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
        .then(function (answer) {
            if (answer.Options === "View All Employees") {
                viewEmployees();
            }
            else if (answer.Options === "View All Employees by Department") {
                viewByDepartment();
            }
            else if (answer.Options === "View All Employees by Manager") {
                viewByManager();
            }
            else if (answer.Options === "Add Employee") {
                addEmployee();
            }
            else if (answer.Options === "Remove Employee") {
                selectRemoveEmployee();
            }
            else if (answer.Options === "Update Employee Role") {
                updateEmployeeRole();
            }
            else if (answer.Options === "Update Employee Manager") {
                updateEmployeeManager();
            }
            else {
                connection.end();
            }

        })
}

function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function (err, results) {
        if (err) throw (err);
        console.table(results)
        start();
    })

}
function viewByDepartment() {

}
function viewByManager() {

}
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "employeeFirstName",
                type: "input",
                message: "What is the employee's first name?",
            },
                {
                    name: "employeeLastName",
                    type: "input",
                    message: "What is the employee's last name?",
                },
                {
                    name: "employeeRole",
                    type: "list",
                    message: "What is their position?",
                    choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer"]
                })
            .then(function (employee) {

                employeeFirstName = employee.employeeFirstName;
                employeeLastName = employee.employeeLastName;
                employeeRole = employee.employeeRole;


                insertEmployee(employee);
            })

    })
}

function insertEmployee(employee) {
    connection.query(
        "INSERT INTO employees SET ?",
        {
            employeeFirstName: employee.employeeFirstName,
            employeeLastName: employee.employeeLastName,
            employeeRole: employee.employeeRole
        })

}
function selectRemoveEmployee(employee) {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "removeEmployee",
                type: "list",
                message: "Which employee would you like to remove?",
                choices: function () {
                    var employeeArray = [];
                    for (var i = 0; i < results.length; i++) {
                        employeeArray.push(results[i].employeeFirstName);
                    }
                    return employeeArray;
                }
            })
            .then(function (employee) {
                removeEmployee(employee);
            })
    })

}
// function removeEmployee(employee){
//     connection.query(
//         "DELETE * From employees where first_name = "
//     )

// }
function updateEmployeeRole() {
    connection.query("UPDATE FROM emplpyees", function (err, results){
        if (err) throw err;
        inquirer
            .prompt({
                name: "employeeRole",
                type: "list",
                message: "Select the employee whose role you would like to update",
                choices: function () {
                    var employeeArray = [];
                    for (var i = 0; i < results.length; i++) {
                        employeeArray.push(results[i].employeeFirstName);
                    }
                    return employeeArray;
                }  
            })
    })

}
function updateEmployeeManager() {

}
