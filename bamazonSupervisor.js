var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var tabler = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password,m 
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;

    console.log("");
    console.log("Welcome to Bamazon's Supervisor Tool! :)");
    console.log("");
    startSupervisor();
});

function startSupervisor() {

	inquirer.prompt([

          {
            type: "list",
            name: "option",
            message: "Please select an option.",
            choices: ["View Products Sales by Department", "Create New Department", "Exit"]
          },

          ]).then(function(sup) {

                if (sup.option === "View Products Sales by Department") {

                    connection.query("SELECT department_id AS ID, department_name AS Department, overhead_costs AS Costs, total_sales AS Sales, total_sales - overhead_costs AS Profit FROM departments", function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    startSupervisor();

                    });

                }

                else if (sup.option === "Create New Department") {

                	connection.query("SELECT * FROM departments", function(err, res) {

                            if (err) throw err;

                            var myNextCount = (res.length + 1);


                            prompt.start();
                                          // 
                            prompt.get([

                            {
                              name: 'deptName',
                              description:'Please enter the name of the department you would like to add',
                              message: 'That is not a valid name.',
                              type: 'string',
                              required: true
                            },

                            {
                              name: 'costs',
                              description:'Please enter the estimated overhead costs for this department',
                              message: 'That is not a valid number.',
                              type: 'number',
                              required: true
                            }

                          
                            ], function (err, result) {

                                    
                                    console.log("New department added: " + result.deptName);

                                    connection.query("INSERT INTO departments SET ?", {

                                    department_id: myNextCount,    
                                    department_name: result.deptName,
                                    overhead_costs: result.costs,
                                    total_sales: 0.00,

                                }, function(err, res) {

                                     connection.query("SELECT * FROM departments WHERE department_name = ?", 
                                        result.deptName, function(err, reso) {
                                        if (err) throw err;

                                        console.table(reso);
                                        startSupervisor();

                                        });

                                
                                });
                            });

                        }); 


                }

                else if (sup.option === "Exit") {

                	connection.end();
                }

            });
}