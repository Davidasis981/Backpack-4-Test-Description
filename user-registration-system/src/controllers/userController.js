const UserRepositoryMySQL = require('../repositories/userRepositoryMySQL');

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const userRepository = new UserRepositoryMySQL();

class UserController {
    static async registerUser(req, res) {
        try {
            const { username, password, age, email } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const photo = req.file ? req.file.filename : null;

            const userId = await userRepository.createUser({
                username,
                password: hashedPassword,
                age,
                email,
                photo,
            });

            const docId = await userRepository.createDocument({userId});
            res.status(201).json({ message: 'User registered successfully', userId, docId });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', 'error': error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            console.log('I am in login user function!');
            
            const { username, password } = req.body;
            const user = await userRepository.getUserByUsername(username);
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' }); // same message for invalid inputs
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', 'error': error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { userId } = req.user; // added in auth middleware            
            const { username, age, email } = req.body;

            await userRepository.updateUser(userId, { username, age, email });

            res.json({ message: 'User profile updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user profile', 'error': error.message });
        }
    }


    static async getInactiveUsers(req, res) {
        try {
            const inactiveUsers = await userRepository.getInactiveUsers();
            res.json({'data': inactiveUsers});
        } catch (error) {
            res.status(500).json({ message: 'Error updating user profile', 'error': error.message });
        }
    }

}

module.exports = UserController;
