const UserRepositoryMySQL = require('../repositories/userRepositoryMySQL');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

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

      const userDocPath = path.join(__dirname, `../uploads/${username}.txt`);
      fs.writeFileSync(userDocPath, `docName: college\nstatus: inactive\nusername: ${username}`);

      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
}

module.exports = UserController;
