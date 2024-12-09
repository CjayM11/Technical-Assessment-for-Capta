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

        // Arrays to store valid and invalid users
        const hashedUsers = [];
        const invalidUsers = []; // Array to hold users with missing or invalid UserId, email
        const duplicateUsers = []; // To collect users with duplicate UserId
        const usersToReprocess = []; // To track users who were assigned new UserId

        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Process each user and handle necessary checks
        for (const userData of users) {
            const userIssues = {}; // Object to store issues for the user

            // Check if UserId is missing or duplicated
            if (!userData.UserId) {
                userIssues.missingUserId = true; // Mark user as missing UserId
                // Assign a new unique UserId if missing
                userData.UserId = highestUserId + 1;
                highestUserId = userData.UserId; // Update the highest UserId
                usersToReprocess.push(userData); // Track users for reprocessing
            } else if (existingUsers.some(user => user.UserId === userData.UserId)) {
                userIssues.duplicateUserId = true; // Mark user as having a duplicate UserId
                duplicateUsers.push(userData);  // Collect duplicate users
            }

            // Check if email is missing or invalid
            if (!userData.Email) {
                userIssues.missingEmail = true; // Mark user as missing email
            } else if (!emailRegex.test(userData.Email)) {
                userIssues.invalidEmail = true; // Mark user as having an invalid email
            }

            // If there are any issues, add to the invalidUsers array
            if (Object.keys(userIssues).length > 0) {
                invalidUsers.push({ userData, issues: userIssues });
                continue; // Skip this user and move to the next one
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

        // Reprocess users who were assigned a new UserId (optional based on additional logic)
        if (usersToReprocess.length > 0) {
            console.log("Reprocessing users with newly assigned UserIds");
            for (const userData of usersToReprocess) {
                // Add the reprocessed user to the valid users list
                hashedUsers.push(userData); // Re-add the reprocessed user
            }
        }

        const importsFolder = path.join(__dirname, 'imports');

        // Ensure the 'imports' folder exists, if not create it
        if (!fs.existsSync(importsFolder)) {
            fs.mkdirSync(importsFolder, { recursive: true }); // 'recursive' ensures subdirectories are also created
        }
        
        // Ensure the 'duplicateUserId' folder exists if you are saving files there
        const duplicateFolder = path.join(importsFolder, 'duplicateUserId');
        if (!fs.existsSync(duplicateFolder)) {
            fs.mkdirSync(duplicateFolder, { recursive: true });
        }
        
        // Ensure the missingUserIds.json file is created in the right folder
        const missingUserIdsPath = path.join(importsFolder, 'missingUserIds.json');
        fs.writeFileSync(missingUserIdsPath, JSON.stringify(usersWithMissingIds, null, 2));
        

        // Insert the valid users in bulk
        if (hashedUsers.length > 0) {
            await User.insertMany(hashedUsers);
            console.log('Valid users have been imported successfully!');
        } else {
            console.log('No valid users to import.');
        }
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        mongoose.connection.close();
    }
}

importData();
