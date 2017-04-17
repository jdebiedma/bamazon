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

                else if (manager.option === "Add to Inventory") {

                    connection.query("SELECT * FROM products", function(err, res) {

                        if (err) throw err;

                        console.table(res);


                        prompt.start();
                                      // 
                        prompt.get([

                        {
                          name: 'id',
                          description:'Please enter the ID of the item you would like to add inventory for',
                          message: 'That is not a valid ID.',
                          type: 'integer',
                          required: true
                        },

                        {
                          name: 'amount',
                          description:'Please enter the amount of units you are adding to this inventory',
                          message: 'That is not a valid number.',
                          type: 'integer',
                          required: true
                        },

                      
                        ], function (err, result) {

                                for (var i = 0; i < res.length; i++) {

                                    if (result.id === res[i].item_id) {

                                        console.log("You have added "+ result.amount + " more unit(s) of " 
                                            + res[i].product_name + " to the inventory.");

                                        

                                    }
                                }    
                        });

                    });

                }
  
          });



}
