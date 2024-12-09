const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('./models/users');
const path = require('path');

async function importData() {
    try {
        // Read and parse users.json
        const usersData = fs.readFileSync(path.join(__dirname, 'db_backup', 'users.json'), 'utf8');
        const users = JSON.parse(usersData);

        // Fetch existing user IDs from the database to check for duplicates
        const existingUsers = await User.find({}, 'UserId').lean();

        // Get the highest existing UserId for generating a new unique ID
        let highestUserId = existingUsers.reduce((max, user) => user.UserId > max ? user.UserId : max, 0);

        // Process each user and handle the necessary checks
        const hashedUsers = [];
        const duplicateUsers = []; // To collect users with duplicate UserId
        const usersToReprocess = []; // To track users who were assigned new UserId

        for (const userData of users) {
            // Check if the UserId exists and is not duplicated
            if (existingUsers.some(user => user.UserId === userData.UserId)) {
                duplicateUsers.push(userData);  // Collect duplicate users
                continue; // Skip the user and move to the next one
            }

            // If the UserId is missing, assign a unique ID
            if (!userData.UserId) {
                userData.UserId = highestUserId + 1;
                highestUserId = userData.UserId; // Update the highest UserId
                usersToReprocess.push(userData); // Track users for reprocessing
            }

            // Ensure the password exists and meets the required length
            let password = userData.Password ? userData.Password : 'ForcedReset';
            if (password !== 'ForcedReset' && password.length < 6) {
                password = 'ForcedReset';  // Force reset if password is too short
            }

            // Hash the password if it's not a reset password
            const hashedPassword = password === 'ForcedReset' ? password : await bcrypt.hash(password, 10);

            // Add the user to the list of valid users
            hashedUsers.push({
                _id: userData.UserId,
                Name: userData.Name,
                Email: userData.Email,
                Password: hashedPassword,
                Role: userData.Role || 'user',
            });
        }

        // Reprocess users who were assigned a new UserId
        // You can adjust this logic if additional processing is needed for reprocessed users
        if (usersToReprocess.length > 0) {
            console.log("Reprocessing users with newly assigned UserIds");
            for (const userData of usersToReprocess) {
                // Check for duplicates and handle the reprocessed users again
                if (existingUsers.some(user => user.UserId === userData.UserId)) {
                    console.log(`Duplicate found for UserId: ${userData.UserId}, skipping.`);
                    continue;
                }
                hashedUsers.push(userData); // Re-add the reprocessed user to the valid users list
            }
        }

        // Save duplicate users to a file if there are any
        if (duplicateUsers.length > 0) {
            fs.writeFileSync(path.join(__dirname, 'imports', 'duplicateUserId', 'duplicates.json'), JSON.stringify(duplicateUsers, null, 2));
        }

        // Insert the valid users in bulk
        await User.insertMany(hashedUsers);
        console.log('Users have been imported successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        mongoose.connection.close();
    }
}

importData();
