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
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "I'm Finished"]
        })
        .then(function (answer) {
            if (answer.Options === "View All Employees") {
                viewEmployees();
            }
            else if (answer.Options === "View All Employees by Department") {
                viewByDepartment();
            }
            // else if (answer.Options === "View All Employees by Manager") {
            //     viewByManager();
            // }
            else if (answer.Options === "Add Employee") {
                addEmployee();
            }
            else if (answer.Options === "Remove Employee") {
                selectRemoveEmployee();
            }
            else if (answer.Options === "Update Employee Role") {
                updateEmployeeRole();
            }
            // else if (answer.Options === "Update Employee Manager") {
            //     updateEmployeeManager();
            // }
            else if (answer.Options === "I'm Finished"){
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
    var query = "select * from employees inner join role on employees.role_id=role.role_id WHERE employees.role_id = 1";
    connection.query(query, function (err, results) {
        if (err) throw (err);

        inquirer
            .prompt({
                name: "selectDepartment",
                type: "list",
                message: "Select which department you would like to view.",
                choices: ["Sales", "Engineering", "Management"]

            })
            .then(function (results) {
                console.table(results)
                start();
            })

    })
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
                message: "What is the employee's first name?"
            },
                {
                    name: "employeeLastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "employeeRole",
                    type: "list",
                    message: "What is their position?",
                    choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Manager"]
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
            first_name: employee.employeeFirstName,
            last_name: employee.employeeLastName,
            role: employee.employeeRole
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
                        employeeArray.push(results[i].first_name);
                    }
                    return employeeArray;
                }
            })
            .then(function (employee) {
                removeEmployee(employee);
            })
    })

}
function removeEmployee(employee) {
    connection.query("DELETE * From employees where first_name='Brennan'", function (err, results){
            if (err) throw err;
            start();
        })

}
function updateEmployeeRole() {
    connection.query("UPDATE FROM emplpyees", function (err, results) {
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
