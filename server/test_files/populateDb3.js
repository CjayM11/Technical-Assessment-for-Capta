const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('./models/users');
const Products = require('./models/products');
const path = require('path');

// Function to import users
async function importData() {
    try {
        // Read and parse users.json
        const usersData = fs.readFileSync(path.join(__dirname, 'db_backup', 'users.json'), 'utf8');
        console.log(usersData)
        const users = JSON.parse(usersData);

        try {
            const usersWithMissingIds = []; // Array to hold users with missing or invalid UserId
            const validUsers = []; // Array to hold valid users for insertion
            
            for (const userData of users) {
                let userId = userData.UserId ? Number(userData.UserId) : null;
            
                // Debug: Log the parsed UserId
                console.log(`Processing UserId: ${userData.UserId}, Parsed: ${userId}`);
            
                // Check if UserId is missing or invalid
                if (userData.UserId === undefined || userData.UserId === null || userData.UserId === '' || isNaN(userId)) {
                    usersWithMissingIds.push(userData);
                    continue;
                }
            
                // Convert UserId to number and update
                userData.UserId = userId;
                validUsers.push(userData);
            }
            
        
            if (usersWithMissingIds.length > 0) {
                const importsFolder = path.join(__dirname, 'imports');
        
                // Ensure the 'imports' folder exists, if not create it
                if (!fs.existsSync(importsFolder)) {
                    fs.mkdirSync(importsFolder, { recursive: true });
                }
        
                // Write the users with missing UserIds to the JSON file
                fs.writeFileSync(path.join(importsFolder, 'missingUserIds.json'), JSON.stringify(usersWithMissingIds, null, 2));
                console.log('Users with missing UserIds have been saved to missingUserIds.json');
            }
        
            // Insert valid users into the database
            await User.insertMany(validUsers);
            console.log('Valid users have been imported successfully!');
        } catch (error) {
            console.error('Error importing data:', error);
        }

        // Hash passwords and prepare the data for bulk insertion
            const hashedUsers = await Promise.all(users.map(async (userData) => {
            let password = userData.Password ? userData.Password : "ForcedReset";
            
            if (password !== "ForcedReset" && password.length < 6) {
                password = 'ForcedReset';  // Force reset if password is too short
            }

            const hashedPassword = password === "ForcedReset" ? password : await bcrypt.hash(password, 10);
            
            return {
                _id: userData.UserId,
                Name: userData.Name,
                Email: userData.Email,
                Password: hashedPassword,
                Role: userData.Role || 'user',
            };
        }));

        // Insert the hashed users in bulk
        await User.insertMany(hashedUsers);
        console.log('Users have been imported successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the import function
importData();
