const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/users');  
const Product = require('./models/products');  
const Orders = require('./models/orders');  
const Cart = require('./models/shopping_cart');  
const mongoose = require('./index');  


async function importUsers() {
    try {
            //Find users.json file in db_backup
        const data = fs.readFileSync(path.join(__dirname, 'db_backup', 'users.json'), 'utf-8');
        const importsFolder = path.join(__dirname, 'imports');
        const users = JSON.parse(data);
        const uniqueUsers = [];
        const duplicateUsers = [];
        const seenEmails = new Set();

            //loop through users 
        users.forEach(user => {
                // ensure all emails are consistant to lower case
            const email = user.email.trim().toLowerCase();
                // check if the email has been seen before
            if (!seenEmails.has(email)) {
                // Not seen before - save to uniqueUsers
                uniqueUsers.push(user);
                // Mark emails has seen to not repeat them
                seenEmails.add(email); 
            } else {
                // Save duplicate users to array
                duplicateUsers.push(user);
            }
        });

            // Check if imports folder exist, if not create it
         if (!fs.existsSync(importsFolder)) {
            fs.mkdirSync(importsFolder, { recursive: true });
            console.log(`Folder '${importsFolder}' created.`);
        }

        console.log('Writing to:', path.join(importsFolder, 'duplicate_emails.json'));

       // write users to with duplicate emails to imports/duplicate_emails.json
        fs.writeFileSync(path.join(importsFolder, 'duplicate_emails.json'), JSON.stringify(duplicateUsers, null, 2));
        console.log('Users with duplicate emails have been saved to duplicate_emails.json');

                //Getting all users to hash passwords
           const hashedUsers = await Promise.all(uniqueUsers.map(async (user) => {
             if (user.password) {
                //implement hashing
                 user.password = await bcrypt.hash(user.password, 10);
              }
             return user;
           }));
            // save filtered users ( email and password validations included)
        await User.insertMany(hashedUsers);
        console.log('Users imported successfully!');
    } catch (error) {
        console.error('Error importing users:', error);
        mongoose.connection.close();  // Close the database connection on error
    }



}

async function importProducts() {
    try {
            //Find users.json file in db_backup
        const data = fs.readFileSync(path.join(__dirname, 'db_backup', 'products.json'), 'utf-8');
        const products = JSON.parse(data);
        await Product.insertMany(products);
        console.log('Products imported successfully!');
    } catch (error) {
        console.error('Error importing products:', error);
        mongoose.connection.close();  // Close the database connection on error
    }
}

async function importOrders() {
    try {
            //Find users.json file in db_backup
        const data = fs.readFileSync(path.join(__dirname, 'db_backup', 'orders.json'), 'utf-8');
        const orders = JSON.parse(data);
        await Orders.insertMany(orders);
        console.log('Orders imported successfully!');
    } catch (error) {
        console.error('Error importing orders:', error);
        mongoose.connection.close();  // Close the database connection on error
    }
}

async function importShoppingCart() {
    try {
            //Find users.json file in db_backup
        const data = fs.readFileSync(path.join(__dirname, 'db_backup', 'shopping_cart.json'), 'utf-8');
        const shoppingCart = JSON.parse(data);
        await Cart.insertMany(shoppingCart);
        console.log('Shopping Cart imported successfully!');
    } catch (error) {
        console.error('Error importing shopping cart:', error);
        mongoose.connection.close();  // Close the database connection on error
    }
}

async function importAllCollections() {
    try {
        await importUsers();
        
        await importProducts();
        
        await importOrders();
        
        await importShoppingCart();
        
    } catch (error) {
        console.error('Error during import process:', error);
    } finally {
        mongoose.connection.close();
    }
}

importAllCollections();