var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var tabler = require("console.table");

var thisDept;
var deptArray = [];

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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
          },

          ]).then(function(manager) {

                if (manager.option === "View Products for Sale") {

                    connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    startManager();

                    });

                    


                }

                else if (manager.option === "View Low Inventory") {

                    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
                    if (err) throw err;

                    if (res.length > 0) {

                    console.table(res);

                    }

                    else {

                        console.log("");
                        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
                        console.log("All items have 5 or more units currently.");
                        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
                        console.log("");
                    }

                    startManager();

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

                                        var newAmount = (res[i].stock_quantity + result.amount);
                                        var mySelection = res[i].product_name;

                                            connection.query("UPDATE products SET ? WHERE ?", [
                                                //Update the new stock amount
                                                {
                                                    stock_quantity: newAmount
                                                },

                                                //only for the item that is the one the user chose
                                                {
                                                    item_id: result.id
                                                }
                                            ], function(err, res) {});

                                        console.log("You have added "+ result.amount + " more unit(s) of " 
                                            + res[i].product_name + " to the inventory, making the "+mySelection+" total " 
                                            + newAmount + ".");
                                        startManager();



                                    }
                                }    
                        });

                    });


                 
                }

                else if (manager.option === "Add New Product") {

                    connection.query("SELECT * FROM departments", function(err, res) {

                        if (err) throw err;

                        for (var i = 0; i < res.length; i++) {

                            deptArray.push(res[i].department_name)  ; 
                        }

                    

                       

                        inquirer.prompt([

                          {
                            type: "list",
                            name: "option",
                            message: "Please select a department.",
                            choices: deptArray
                          },

                          ]).then(function(chooser) {

                                    thisDept = chooser.option;
                             

                        

                        connection.query("SELECT * FROM products", function(err, res) {

                            if (err) throw err;

                            var myNextCount = (res.length + 1);


                            prompt.start();
                                          // 
                            prompt.get([

                            {
                              name: 'itemName',
                              description:'Please enter the name of the product you would like to add to ' + thisDept,
                              message: 'That is not a valid name.',
                              type: 'string',
                              required: true
                            },

                            {
                              name: 'price',
                              description:'Please enter how much the item will cost',
                              message: 'That is not a valid number.',
                              type: 'number',
                              required: true
                            },

                            {
                              name: 'stock',
                              description:'Please enter how many units of this item will be stocked in the inventory',
                              message: 'That is not a valid amount.',
                              type: 'integer',
                              required: true
                            },

                          
                            ], function (err, result) {

                                    
                                    console.log("New item added to inventory!");





                                    connection.query("INSERT INTO products SET ?", {
                                    item_id: myNextCount,    
                                    product_name: result.itemName,
                                    department_name: thisDept,
                                    price: result.price,
                                    stock_quantity: result.stock,
                                }, function(err, res) {

                                     connection.query("SELECT * FROM products WHERE product_name = ?", 
                                        result.itemName, function(err, reso) {
                                        if (err) throw err;

                                        console.table(reso);
                                        startManager();

                                        });

                                
                                });
                            });

                        });    

                      });

                    });

                }

                else if (manager.option === "Exit") {

                    connection.end();
                }
  
          });

 

}
