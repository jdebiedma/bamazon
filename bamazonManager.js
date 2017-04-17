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
    console.log("Welcome to Bamazon's Manager Tool! :)");
    console.log("");
    startManager();
});



function startManager() {

    inquirer.prompt([

          {
            type: "list",
            name: "option",
            message: "Please select an option.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
          },

          ]).then(function(manager) {

                if (manager.option === "View Products for Sale") {

                    connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    });

                }

                else if (manager.option === "View Low Inventory") {

                    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    });

                }
  
          });



}
