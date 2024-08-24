const mysql = require('mysql2/promise');
const UserRepository = require('./userRepository');

class UserRepositoryMySQL extends UserRepository {
    constructor() {
        super();
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    async createUser(user) {
        const [result] = await this.connection.execute(
            `INSERT INTO users (username, password, age, email, photo) VALUES (?, ?, ?, ?, ?)`,
            [user.username, user.password, user.age, user.email, user.photo]
        );
        return result.insertId;
    }

    async findUserByUsername(username) {
        const [rows] = await this.connection.execute(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );
        return rows[0];
    }

    // Implement other methods...
}

module.exports = UserRepositoryMySQL;
