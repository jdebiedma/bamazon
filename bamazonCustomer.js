var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");

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
    console.log("Welcome to Bamazon! :)");
    console.log("");
});

startMe();

function startMe() {

	connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            console.log("\n");

            console.log("=-=-=-=-=-=-=-=-= CATALOG =-=-=-=-=-=-=-=-=" + "\n");

            var inventoryCount = res.length;

            for (var i = 0; i < res.length; i++) {

                console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price );

            }

            console.log("\n"+"=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=" );
            console.log("\n");

              prompt.start();
 
				  // 
				  // Get two properties from the user: username and email 
								  // 
					prompt.get([{

				      name: 'id',
				      description:'Please enter an item ID',
				      message: 'That is not a valid ID.',
				      type: 'integer',
				      required: true
				    },

				    {
				      name: 'amount',
				      description: 'How many units would you like to purchase?',
				      message: 'That is not an amount, you dingus.',
				      type: 'integer',
				      required: true
				    } 
				    ], function (err, result) {
				    
				    if (err) throw err;
				 	
				 	if (result.id > res.length) throw err;

		            for (var i = 0; i < res.length; i++) {

		            	if (result.id === res[i].item_id) {

		                console.log("You requested "+ result.amount + " unit(s) of " + res[i].product_name + ".");

			                if (result.amount < res[i].stock_quantity || result.amount === res[i].stock_quantity) {

			                	console.log("That will be $" + (res[i].price * result.amount) + ". Thank you for your purchase!");


			                	var newTotalSales = (res[i].product_sales) + (res[i].price * result.amount);
			                	var newAmount = (res[i].stock_quantity - result.amount);
			                	var mySelection = res[i].product_name;

				                            connection.query("UPDATE products SET ? WHERE ?", [
				                                //Update the new stock amount
				                                {
				                                    stock_quantity: newAmount,
				                                    product_sales: newTotalSales
				                                },

				                                //only for the item that is the one the user chose
				                                {
				                                    item_id: result.id
				                                }
				                            ], function(err, res) {});


				                       	

			                	console.log("Remaining units of " + mySelection + ": " + newAmount);

			                	
			                	connection.end();
			                	
			                }

			                else {

			                	console.log("We don't have that many in stock! Our apologies.");

			                	connection.end();

			                }


		            	}
		            }
				  
				    
				  });
	});
};