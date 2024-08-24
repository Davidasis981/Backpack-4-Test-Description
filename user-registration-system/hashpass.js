const bcrypt = require('bcryptjs');
const saltRounds = 10;

const password = 'YOUR_PASSWORD_PASTE_HERE'; // The password you want to hash

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed Password:', hash);
});
