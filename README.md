# Bamazon

This is me creating my first Markdown file. I will be submitting this to **Bootcampspot** and most likely creating an app in *Heroku* (italics because it's fun). 

If it comes out well I will include this in my [coding portfolio.](https://floating-thicket-78326.herokuapp.com/portfolio.html)

The program incorporates the [mysql](https://www.npmjs.com/package/mysql), [prompt](https://www.npmjs.com/package/prompt), [inquirer](https://www.npmjs.com/package/inquirer), and [console.table](https://www.npmjs.com/package/console.table) packages.

## Using Bamazon

The Bamazon node app has three separate JavaScript files which run different functions.

### Customer Function

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

### Manager Function

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

[<img src="http://imgur.com/a/TjFAN">](http://google.com.au/)



