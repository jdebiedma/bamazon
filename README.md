# Bamazon

This is me creating my first Markdown file. I will be submitting this to **Bootcampspot** and most likely creating an app in *Heroku* (italics because it's fun). 

If it comes out well I will include this in my [coding portfolio.](https://floating-thicket-78326.herokuapp.com/portfolio.html)

The program incorporates the [mysql](https://www.npmjs.com/package/mysql), [prompt](https://www.npmjs.com/package/prompt), [inquirer](https://www.npmjs.com/package/inquirer), and [console.table](https://www.npmjs.com/package/console.table) packages.

## **Tutorial**

The Bamazon node app has three separate JavaScript files which run different functions.

A video link to me using the file can be found [here.](https://www.youtube.com/watch?v=jsCLinRxmWA&feature=youtu.be) 

## **Customer Function**

You can use Bamazon from a customer side by typing this into the bash console:

`node  bamazonCustomer.js`

Upon doing so, you'll see the entire store's catalog presented to you in table format:

				 =-=-=-=-=-=-=-=-= CATALOG =-=-=-=-=-=-=-=-=

				ID: 1 | Banana | $1
				ID: 2 | iPhone | $599.99
				ID: 3 | Paint | $12.12
				ID: 4 | Water Bottle | $1
				ID: 5 | Sprite | $1.5
				ID: 6 | Laptop | $1099.99
				ID: 7 | Windex | $3.99
				ID: 8 | Watermelon | $6
				ID: 9 | Jeans | $29.99
				ID: 10 | Beanie | $14.99
				ID: 11 | Crocs | $44.99
				ID: 12 | Dr. Pepper | $1.49
				ID: 13 | Cat | $499.99
				ID: 14 | Samsung Galaxy S8 | $499.99
				ID: 15 | Mousepad | $8.99
				ID: 16 | beats Headphones | $199.99
				ID: 17 | Hamster | $14.99
				ID: 18 | Basketball | $14.99

				=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= 



You'll then be promoted to enter the ID of the item you want to buy and the quantity you desire. When you do so, the program will display a confirmation message.
The program will also update a MySQL database with an updated quanity, revenue, and total sales for whatever department you bought from.


	prompt: Please enter an item ID:  2
	prompt: How many units would you like to purchase?:  2
	You requested 2 unit(s) of iPhone.
	That will be $1199.98. Thank you for your purchase!
	Remaining units of iPhone: 1

## **Manager Function**

You can use Bamazon from a manager side by typing this into the bash console:

`node  bamazonManager.js`

Upon doing so, you'll be give a list of options to choose from.

	
	> View Products for Sale
	  View Low Inventory
	  Add to Inventory
	  Add New Product
	  Exit

The **View Products for Sale** option will display the inventory of all available products, their sales, and their associated department.

The **View Low Inventory** option will display only those items that have less than 5 units in their stock. 

	? Please select an option. View Low Inventory
	item_id  product_name  department_name  price   stock_quantity  product_sales
	-------  ------------  ---------------  ------  --------------  -------------
	2        iPhone        electronics      599.99  1               5399.91
	13       Cat           animals          499.99  1               3499.93

The **Add to Inventory** option allows the user to add to the inventory units of whatever product they like.

For example, adding 3 more units of iPhone:

	prompt: Please enter the ID of the item you would like to add inventory for:  2
	prompt: Please enter the amount of units you are adding to this inventory:  3
	You have added 3 more unit(s) of iPhone to the inventory, making the iPhone total 4.

The MySQL database is subsequently updated: 

![Image of Database](http://i.imgur.com/NlDu9YQ.png)

The **Add New Product** option allows the user to introduce a new product to the catalog. The program will prompt the user to select an existing department, type in a product name, price, and stock quantity.

For example, adding "Coffee" to the "drinks" department:

	? Please select a department.
	  animals
	  clothing
	> drinks
	  electronics
	  home
	  produce
	  sports

And then answering the prompts:

	prompt: Please enter the name of the product you would like to add to drinks:  Coffee
	prompt: Please enter how much the item will cost:  2.99
	prompt: Please enter how many units of this item will be stocked in the inventory:  65

This will result in a confirmation message and the MySQL database will also be updated:

	New item added to inventory!
	item_id  product_name  department_name  price  stock_quantity  product_sales
	-------  ------------  ---------------  -----  --------------  -------------
	19       Coffee        drinks           2.99   65              0

![Image of Database](http://i.imgur.com/ZHts7Pr.png)



## **Supervisor Function**

Finally, you can use Bamazon from a supervisor's point of view by typing this into the bash console:

`node  bamazonSupervisor.js`

Upon doing so, you'll be give a list of options to choose from.

	? Please select an option. (Use arrow keys)
	> View Products Sales by Department
	  Create New Department
	  Exit


The **View Products Sales by Department** option displays the total costs, sales, and profits of each department. These are updated whenever a customer makes a purchase.

The "Profit" column is not stored in a database, but rather uses MySQL *aliases* as requested by the greedy shmucks at Bamazo- Err, I mean the project requirements.

	ID  Department   Costs  Sales    Profit
	--  -----------  -----  -------  ---------
	1   animals      15000  514.98   -14485.02
	2   clothing     2000   164.95   -1835.05
	3   drinks       5000   22.35    -4977.65
	4   electronics  10000  2415.11  -7584.89
	5   home         4500   0        -4500
	6   produce      4000   0        -4000
	7   sports       3000   44.97    -2955.03


The **Create New Department** option allows the user the add a brand new department in which a manager can add products to.

The user will be prompted to type in a department name and overhead costs; the sales and profit will be 0 by default until a customer buys from it.

	prompt: Please enter the name of the department you would like to add:  automobile
	prompt: Please enter the estimated overhead costs for this department:  11000

Afterwards, a confirmation message will show and the MySQL Database will be updated:


	New department added: automobile
	department_id  department_name  overhead_costs  total_sales
	-------------  ---------------  --------------  -----------
	8              automobile       11000           0

![Image of Database](http://i.imgur.com/F4uTKf4.png)



## Questions/Contact

Thank you for using my program!

If there are any questions or suggestions feel free to email me at juanthefatty@gmail.com .

